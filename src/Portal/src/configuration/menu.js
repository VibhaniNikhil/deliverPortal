const MenuDefinitionType = {
    Item: 1,
    Divider: 2,
    Header: 3
};

const MenuDefinition = [
    {
        type: MenuDefinitionType.Divider,
    },
    {
        text: "sidebar.overview",
        icon: "tachometer-alt-average",
        route: '/home',
        type: MenuDefinitionType.Item,
    },
    {
        text: "sidebar.deliveries",
        icon: "shipping-fast",
        route: '/deliveries',
        type: MenuDefinitionType.Item,
    },
    {
        text: "sidebar.fulfillment",
        icon: "box-open",
        route: '/home',
        type: MenuDefinitionType.Item
    },
    {
        type: MenuDefinitionType.Divider,
    },
    {
        text: "sidebar.manage",
        type: MenuDefinitionType.Header,
    },
    {
        text: "sidebar.customers",
        icon: "user",
        route: '/customers',
        type: MenuDefinitionType.Item,
    },
    {
        text: "sidebar.store",
        icon: "store-alt",
        route: '/home',
        type: MenuDefinitionType.Item,
    },
    {
        text: "sidebar.organizations",
        icon: "sitemap",
        route: '/home',
        type: MenuDefinitionType.Item
    },
    {
        text: "sidebar.employees",
        icon: "users",
        route: '/home',
        type: MenuDefinitionType.Item
    },
    {
        text: "sidebar.billing",
        icon: "money-bill",
        route: '/home',
        type: MenuDefinitionType.Item
    },


    {
        type: MenuDefinitionType.Divider,
    },
    {
        text: "sidebar.orders",
        type: MenuDefinitionType.Header,
    },
    {
        text: "sidebar.openorders",
        icon: "shopping-basket",
        route: '/home',
        type: MenuDefinitionType.Item
    },
    {
        text: "sidebar.manageorders",
        icon: "box-alt",
        route: '/home',
        type: MenuDefinitionType.Item
    },

    {
        type: MenuDefinitionType.Divider,
    },
    {
        text: "sidebar.support",
        type: MenuDefinitionType.Header,
    },
    {
        text: "sidebar.help",
        icon: "headset",
        route: '/home',
        type: MenuDefinitionType.Item
    },
    {
        text: "sidebar.faq",
        icon: "question-circle",
        route: '/home',
        type: MenuDefinitionType.Item
    }
];

export { MenuDefinition, MenuDefinitionType };