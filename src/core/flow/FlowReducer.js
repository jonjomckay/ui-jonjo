import update from 'immutability-helper';
import { Sorts } from '../Sorts';

const defaultFlowState = {
    navigations: [],
    invoke: {

    },
    outcomes: [],
    page: {
        containers: []
    },
    tenant: ''
};

const convertComponent = (page, component) => {
    const data = page.pageComponentDataResponses.find(response => response.pageComponentId === component.id);

    return {
        ...component,
        data: data
    };
};

const convertContainers = (page, containers) => {
    return (containers || [])
        .sort((a, b) => a.order - b.order)
        .map(container => {
            const components = page.pageComponentResponses.filter(component => component.pageContainerId === container.id)
                .sort((a, b) => a.order - b.order)
                .map(component => convertComponent(page, component));

            return {
                ...container,
                components: components,
                containers: convertContainers(page, container.pageContainerResponses)
            };
        });
};

export const flowReducer = (state = defaultFlowState, action) => {
    switch (action.type) {
        case 'FLOW_INVOKE_LOADING':
            return {
                ...state,
                isLoadingInvoke: true
            };
        case 'FLOW_INVOKED':
            const outcomes = (action.data.mapElementInvokeResponses[0].outcomeResponses || [])
                .filter(outcome => outcome.pageObjectBindingId === null);

            const page = action.data.mapElementInvokeResponses[0].pageResponse;

            return {
                ...state,
                isLoadingInvoke: false,
                invoke: action.data,
                outcomes: outcomes,
                page: {
                    containers: convertContainers(page, page.pageContainerResponses)
                },
                tenant: action.tenant
            };
        case 'FLOW_NAVIGATE_LOADING':
            return {
                ...state,
                isLoadingNavigation: true
            };
        case 'FLOW_NAVIGATED':
            const items = action.data.navigationItemResponses.sort(Sorts.byOrder)
                .map(item => {
                    const data = action.data.navigationItemDataResponses.find(data => data.navigationItemId === item.id);

                    return {
                        ...item,
                        data: data
                    };
                });

            const navigations = update(state.navigations, {
                [action.id]: {
                    $set: {
                        id: action.id,
                        name: action.data.label,
                        items: items
                    }
                }
            });

            return {
                ...state,
                isLoadingNavigation: false,
                navigations: navigations
            };
        default:
            return state;
    }
};
