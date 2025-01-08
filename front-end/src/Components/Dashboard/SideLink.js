import { faBell, faBox, faBullhorn, faCartPlus, faChartBar, faCubes, faDiagramProject, faFolderPlus, faFolderTree, faListCheck, faShoppingCart, faTags, faTruck, faUserGear, faUserMinus, faUserPen, faUserPlus, faUsers, faUsersGear } from '@fortawesome/free-solid-svg-icons';


export const links = [
    {
        list: "Users",
        icon: faUsersGear,
        role: [0],
        items: [
            {
                name: 'All Users',
                icon: faUsers,
                path: "users"
            },
            {
                name: 'Add User',
                icon: faUserPlus,
                path: "add/user"
            },
        ]
    },
    {
        list: "Categories",
        icon: faFolderTree,
        role: [0,3],
        items: [
            {
                name: 'All Categories',
                icon: faChartBar,
                path: "categories"
            },
            {
                name: 'Add Category',
                icon: faFolderPlus,
                path: "add/category"
            },
        ]
    },
    {
        list: "Ads",
        icon: faListCheck,
        role: [0,3],
        items: [
            {
                name: 'All Ads',
                icon: faBullhorn,
                path: "ads"
            },
            {
                name: 'Add Ads',
                icon: faBell,
                path: "add/ad"
            },
        ]
    },
    {
        list: "Products",
        icon: faCubes,
        role: [0,3],
        items: [
            {
                name: 'All Products',
                icon: faTags,
                path: "products"
            },
            {
                name: 'Add Product',
                icon: faBox,
                path: "add/product"
            },
        ]
    },
    {
        list: "Carts",
        icon: faShoppingCart,
        role: [0,3],
        items: [
            {
                name: 'All Carts',
                icon: faDiagramProject,
                path: "carts"
            },
        ]
    },
    {
        list: "Delivery",
        icon: faTruck,
        role: [0,2],
        items: [
            {
                name: 'All Carts',
                icon: faDiagramProject,
                path: "delivery"
            },
        ]
    },
    {
        list: "Setting",
        icon: faUserGear,
        role: [0,1,2,3],
        items: [
            {
                name: 'Edit User',
                icon: faUserPen,
                path: "edit/user"
            },
        ]
    },
]