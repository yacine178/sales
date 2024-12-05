import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { useSettingsStore } from '../store/settingsStore';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      products: 'Products',
      parts: 'Parts',
      categories: 'Categories',
      customers: 'Customers',
      sales: 'Sales',
      reports: 'Reports',
      users: 'Users',
      settings: 'Settings',
      logout: 'Logout',

      // Common
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      search: 'Search',
      actions: 'Actions',
      name: 'Name',
      description: 'Description',
      category: 'Category',
      quantity: 'Quantity',
      price: 'Price',
      status: 'Status',
      notes: 'Notes',
      date: 'Date',
      total: 'Total',
      subtotal: 'Subtotal',
      
      // Settings
      languageSettings: 'Language Settings',
      languageSettingsDescription: 'Manage application languages and translations',
      currentLanguage: 'Current Language',
      addNewLanguage: 'Add New Language',
      languageCode: 'Language Code',
      languageName: 'Language Name',
      availableLanguages: 'Available Languages',
      tvaSettings: 'TVA Settings',
      tvaSettingsDescription: 'Configure TVA (Value Added Tax) settings',
      enableTva: 'Enable TVA',
      tvaRate: 'TVA Rate',

      // Sales
      newSale: 'New Sale',
      editSale: 'Edit Sale',
      completeSale: 'Complete Sale',
      invoice: 'Invoice',
      print: 'Print',
      download: 'Download',
      sendEmail: 'Send Email',
      customerInformation: 'Customer Information',
      searchCustomers: 'Search customers...',
      searchProducts: 'Search products...',
      product: 'Product',
      unitPrice: 'Unit Price',
      tva: 'TVA',
      additionalNotes: 'Additional Notes',
      addNotesPlaceholder: 'Add any additional notes here...',

      // Customers
      addCustomer: 'Add Customer',
      editCustomer: 'Edit Customer',
      customerDetails: 'Customer Details',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      nif: 'NIF',
      nis: 'NIS',
      rc: 'RC',

      // Products
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      productDetails: 'Product Details',
      referenceCode: 'Reference Code',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      assemblyParts: 'Assembly Parts',

      // Parts
      addPart: 'Add Part',
      editPart: 'Edit Part',
      partDetails: 'Part Details',
      minimumStock: 'Minimum Stock',

      // Categories
      addCategory: 'Add Category',
      editCategory: 'Edit Category',
      categoryDetails: 'Category Details',
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: 'Tableau de bord',
      products: 'Produits',
      parts: 'Pièces',
      categories: 'Catégories',
      customers: 'Clients',
      sales: 'Ventes',
      reports: 'Rapports',
      users: 'Utilisateurs',
      settings: 'Paramètres',
      logout: 'Déconnexion',

      // Common
      add: 'Ajouter',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      search: 'Rechercher',
      actions: 'Actions',
      name: 'Nom',
      description: 'Description',
      category: 'Catégorie',
      quantity: 'Quantité',
      price: 'Prix',
      status: 'Statut',
      notes: 'Notes',
      date: 'Date',
      total: 'Total',
      subtotal: 'Sous-total',

      // Settings
      languageSettings: 'Paramètres de langue',
      languageSettingsDescription: 'Gérer les langues et traductions de l\'application',
      currentLanguage: 'Langue actuelle',
      addNewLanguage: 'Ajouter une nouvelle langue',
      languageCode: 'Code de langue',
      languageName: 'Nom de la langue',
      availableLanguages: 'Langues disponibles',
      tvaSettings: 'Paramètres TVA',
      tvaSettingsDescription: 'Configurer les paramètres de TVA',
      enableTva: 'Activer la TVA',
      tvaRate: 'Taux de TVA',

      // Sales
      newSale: 'Nouvelle vente',
      editSale: 'Modifier la vente',
      completeSale: 'Finaliser la vente',
      invoice: 'Facture',
      print: 'Imprimer',
      download: 'Télécharger',
      sendEmail: 'Envoyer par email',
      customerInformation: 'Informations client',
      searchCustomers: 'Rechercher des clients...',
      searchProducts: 'Rechercher des produits...',
      product: 'Produit',
      unitPrice: 'Prix unitaire',
      tva: 'TVA',
      additionalNotes: 'Notes additionnelles',
      addNotesPlaceholder: 'Ajouter des notes supplémentaires ici...',

      // Customers
      addCustomer: 'Ajouter un client',
      editCustomer: 'Modifier le client',
      customerDetails: 'Détails du client',
      company: 'Société',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
      nif: 'NIF',
      nis: 'NIS',
      rc: 'RC',

      // Products
      addProduct: 'Ajouter un produit',
      editProduct: 'Modifier le produit',
      productDetails: 'Détails du produit',
      referenceCode: 'Code de référence',
      inStock: 'En stock',
      lowStock: 'Stock faible',
      assemblyParts: 'Pièces d\'assemblage',

      // Parts
      addPart: 'Ajouter une pièce',
      editPart: 'Modifier la pièce',
      partDetails: 'Détails de la pièce',
      minimumStock: 'Stock minimum',

      // Categories
      addCategory: 'Ajouter une catégorie',
      editCategory: 'Modifier la catégorie',
      categoryDetails: 'Détails de la catégorie',
    }
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: useSettingsStore.getState().language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;