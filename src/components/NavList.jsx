import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export const getPrimaryNavList = () => {
  return [
    {
      title: 'Dashboard',
      route: '/dashboard',
      Icon: SpaceDashboardIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Warehouse Planning',
      route: '/warehouse-planning',
      Icon: WarehouseIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Warehouse Analytics',
      route: '/warehouse-analytics',
      Icon: AnalyticsIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Inventory Actions',
      route: '/inventory-actions',
      Icon: InventoryIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Invoice Data Manager',
      route: '/invoice-data-manager',
      Icon: ReceiptIcon,
      description: 'ADD DESCRIPTION HERE',
    },
    {
      title: 'Upgrade Account',
      route: '/upgrade-account',
      Icon: KeyboardDoubleArrowUpIcon,
      description: 'ADD DESCRIPTION HERE',
    },

  ];
};
