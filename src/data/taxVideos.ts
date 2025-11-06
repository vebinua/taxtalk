export interface TaxVideo {
  id: string;
  categoryId: number;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export const taxVideos: TaxVideo[] = [
  // Income Tax (categoryId: 1)
  { id: 'it1', categoryId: 1, title: 'Personal Income Tax Essentials', duration: '50m', thumbnail: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Master the fundamentals of personal income tax filing in Singapore' },
  { id: 'it2', categoryId: 1, title: 'Income Tax Deductions & Reliefs', duration: '55m', thumbnail: 'https://images.pexels.com/photos/7651901/pexels-photo-7651901.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Learn about tax deductions and reliefs available to individuals' },
  { id: 'it3', categoryId: 1, title: 'Corporate Income Tax Fundamentals', duration: '60m', thumbnail: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding corporate tax obligations and compliance' },
  { id: 'it4', categoryId: 1, title: 'Tax Filing Best Practices', duration: '48m', thumbnail: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Best practices for accurate and timely tax filing' },
  { id: 'it5', categoryId: 1, title: 'Advanced Tax Planning Strategies', duration: '65m', thumbnail: 'https://images.pexels.com/photos/7651175/pexels-photo-7651175.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Strategic tax planning for individuals and businesses' },

  // GST (categoryId: 2)
  { id: 'gst1', categoryId: 2, title: 'GST Fundamentals: A Complete Guide', duration: '45m', thumbnail: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Comprehensive overview of GST in Singapore' },
  { id: 'gst2', categoryId: 2, title: 'GST Input Tax Claims', duration: '46m', thumbnail: 'https://images.pexels.com/photos/7651439/pexels-photo-7651439.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding input tax claims and recovery' },
  { id: 'gst3', categoryId: 2, title: 'GST Compliance for Businesses', duration: '55m', thumbnail: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Essential GST compliance requirements for businesses' },
  { id: 'gst4', categoryId: 2, title: 'GST on Digital Services', duration: '42m', thumbnail: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'GST implications for digital services and e-commerce' },
  { id: 'gst5', categoryId: 2, title: 'GST Returns and Reporting', duration: '50m', thumbnail: 'https://images.pexels.com/photos/7651901/pexels-photo-7651901.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Filing GST returns accurately and on time' },

  // Property Tax (categoryId: 3)
  { id: 'pt1', categoryId: 3, title: 'Property Tax Overview', duration: '38m', thumbnail: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding property tax in Singapore' },
  { id: 'pt2', categoryId: 3, title: 'Property Tax Calculations', duration: '44m', thumbnail: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'How property tax is calculated and assessed' },
  { id: 'pt3', categoryId: 3, title: 'Residential vs Commercial Property Tax', duration: '40m', thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Different tax rates for various property types' },
  { id: 'pt4', categoryId: 3, title: 'Property Tax Rebates and Concessions', duration: '36m', thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Available rebates and concessions for property owners' },
  { id: 'pt5', categoryId: 3, title: 'Property Tax Appeals Process', duration: '42m', thumbnail: 'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'How to appeal your property tax assessment' },

  // Motor Vehicle Tax (categoryId: 4)
  { id: 'mvt1', categoryId: 4, title: 'Motor Vehicle Tax Basics', duration: '35m', thumbnail: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Introduction to motor vehicle taxes in Singapore' },
  { id: 'mvt2', categoryId: 4, title: 'Road Tax and ARF Explained', duration: '40m', thumbnail: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding road tax and Additional Registration Fee' },
  { id: 'mvt3', categoryId: 4, title: 'COE and Vehicle Costs', duration: '45m', thumbnail: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Certificate of Entitlement and total vehicle ownership costs' },
  { id: 'mvt4', categoryId: 4, title: 'Electric Vehicle Tax Incentives', duration: '38m', thumbnail: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax incentives and rebates for electric vehicles' },
  { id: 'mvt5', categoryId: 4, title: 'Commercial Vehicle Taxes', duration: '42m', thumbnail: 'https://images.pexels.com/photos/1484790/pexels-photo-1484790.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax considerations for commercial vehicles' },

  // Customs & Excise Duties (categoryId: 5)
  { id: 'ced1', categoryId: 5, title: 'Customs Duties Overview', duration: '46m', thumbnail: 'https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding customs and excise duties' },
  { id: 'ced2', categoryId: 5, title: 'Import and Export Procedures', duration: '52m', thumbnail: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Customs procedures for imports and exports' },
  { id: 'ced3', categoryId: 5, title: 'Duty Calculations and Payments', duration: '44m', thumbnail: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'How to calculate and pay customs duties' },
  { id: 'ced4', categoryId: 5, title: 'Free Trade Agreements Impact', duration: '48m', thumbnail: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Impact of FTAs on customs duties' },
  { id: 'ced5', categoryId: 5, title: 'Customs Compliance Best Practices', duration: '50m', thumbnail: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Ensuring compliance with customs regulations' },

  // Foreign Worker Levy (categoryId: 6)
  { id: 'fwl1', categoryId: 6, title: 'Foreign Worker Levy Basics', duration: '40m', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Introduction to foreign worker levy system' },
  { id: 'fwl2', categoryId: 6, title: 'Levy Rates and Calculations', duration: '42m', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding levy rates for different sectors' },
  { id: 'fwl3', categoryId: 6, title: 'Dependency Ratio Requirements', duration: '38m', thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Managing dependency ratios and quotas' },
  { id: 'fwl4', categoryId: 6, title: 'Levy Concessions and Rebates', duration: '36m', thumbnail: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Available levy concessions for employers' },
  { id: 'fwl5', categoryId: 6, title: 'Levy Payment Procedures', duration: '34m', thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'How to pay foreign worker levy correctly' },

  // CPF Contributions (categoryId: 7)
  { id: 'cpf1', categoryId: 7, title: 'CPF Contribution Basics', duration: '48m', thumbnail: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding CPF contribution requirements' },
  { id: 'cpf2', categoryId: 7, title: 'Employer CPF Obligations', duration: '45m', thumbnail: 'https://images.pexels.com/photos/7651439/pexels-photo-7651439.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Employer responsibilities for CPF contributions' },
  { id: 'cpf3', categoryId: 7, title: 'CPF Contribution Rates', duration: '42m', thumbnail: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Current CPF contribution rates and age bands' },
  { id: 'cpf4', categoryId: 7, title: 'CPF for Self-Employed', duration: '40m', thumbnail: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'MediSave contributions for self-employed persons' },
  { id: 'cpf5', categoryId: 7, title: 'CPF Compliance and Penalties', duration: '38m', thumbnail: 'https://images.pexels.com/photos/7651901/pexels-photo-7651901.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Avoiding penalties through proper CPF compliance' },

  // Stamp Duty (categoryId: 8)
  { id: 'sd1', categoryId: 8, title: 'Stamp Duty Overview', duration: '44m', thumbnail: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Introduction to stamp duty in Singapore' },
  { id: 'sd2', categoryId: 8, title: 'Property Stamp Duty Calculations', duration: '50m', thumbnail: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Calculating stamp duty for property transactions' },
  { id: 'sd3', categoryId: 8, title: 'Additional Buyer\'s Stamp Duty (ABSD)', duration: '46m', thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding ABSD rates and exemptions' },
  { id: 'sd4', categoryId: 8, title: 'Seller\'s Stamp Duty (SSD)', duration: '42m', thumbnail: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'SSD rules and holding periods' },
  { id: 'sd5', categoryId: 8, title: 'Stamp Duty on Shares and Documents', duration: '40m', thumbnail: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Stamp duty requirements for shares and legal documents' },

  // Environmental & Carbon Taxes (categoryId: 9)
  { id: 'ect1', categoryId: 9, title: 'Carbon Tax Introduction', duration: '42m', thumbnail: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding Singapore\'s carbon tax regime' },
  { id: 'ect2', categoryId: 9, title: 'Carbon Tax Compliance', duration: '45m', thumbnail: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Compliance requirements for carbon emissions' },
  { id: 'ect3', categoryId: 9, title: 'Environmental Levies and Charges', duration: '40m', thumbnail: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Overview of environmental levies in Singapore' },
  { id: 'ect4', categoryId: 9, title: 'Green Incentives and Tax Credits', duration: '38m', thumbnail: 'https://images.pexels.com/photos/1472841/pexels-photo-1472841.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax incentives for green initiatives' },
  { id: 'ect5', categoryId: 9, title: 'Sustainability Reporting Requirements', duration: '44m', thumbnail: 'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Environmental reporting and disclosure requirements' },

  // Betting & Gambling Taxes (categoryId: 10)
  { id: 'bgt1', categoryId: 10, title: 'Gambling Tax Framework', duration: '36m', thumbnail: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Overview of gambling taxation in Singapore' },
  { id: 'bgt2', categoryId: 10, title: 'Casino Tax and Levies', duration: '40m', thumbnail: 'https://images.pexels.com/photos/3063452/pexels-photo-3063452.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax structure for casino operations' },
  { id: 'bgt3', categoryId: 10, title: 'Betting Duty Regulations', duration: '38m', thumbnail: 'https://images.pexels.com/photos/262028/pexels-photo-262028.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Betting duty rates and compliance' },
  { id: 'bgt4', categoryId: 10, title: 'Gaming Tax Compliance', duration: '42m', thumbnail: 'https://images.pexels.com/photos/3597114/pexels-photo-3597114.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Compliance requirements for gaming operators' },
  { id: 'bgt5', categoryId: 10, title: 'Online Gambling Taxation', duration: '44m', thumbnail: 'https://images.pexels.com/photos/6251245/pexels-photo-6251245.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax implications for online gambling platforms' },

  // Tobacco & Alcohol Taxes (categoryId: 11)
  { id: 'tat1', categoryId: 11, title: 'Excise Duty on Tobacco', duration: '40m', thumbnail: 'https://images.pexels.com/photos/5926207/pexels-photo-5926207.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding tobacco excise duties' },
  { id: 'tat2', categoryId: 11, title: 'Alcohol Excise Duty', duration: '42m', thumbnail: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Excise duty rates for alcoholic beverages' },
  { id: 'tat3', categoryId: 11, title: 'Tobacco Licensing Requirements', duration: '38m', thumbnail: 'https://images.pexels.com/photos/4667399/pexels-photo-4667399.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Licensing and compliance for tobacco products' },
  { id: 'tat4', categoryId: 11, title: 'Import Controls and Permits', duration: '44m', thumbnail: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Import regulations for tobacco and alcohol' },
  { id: 'tat5', categoryId: 11, title: 'Tax Stamps and Authentication', duration: '36m', thumbnail: 'https://images.pexels.com/photos/3746957/pexels-photo-3746957.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tax stamp requirements and verification' },

  // Business & Corporate Taxes (categoryId: 12)
  { id: 'bct1', categoryId: 12, title: 'Corporate Tax Planning', duration: '55m', thumbnail: 'https://images.pexels.com/photos/6863515/pexels-photo-6863515.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Strategic corporate tax planning techniques' },
  { id: 'bct2', categoryId: 12, title: 'Business Tax Incentives', duration: '50m', thumbnail: 'https://images.pexels.com/photos/7651439/pexels-photo-7651439.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Available tax incentives for businesses in Singapore' },
  { id: 'bct3', categoryId: 12, title: 'Transfer Pricing Fundamentals', duration: '60m', thumbnail: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Understanding transfer pricing regulations' },
  { id: 'bct4', categoryId: 12, title: 'Withholding Tax Essentials', duration: '48m', thumbnail: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Withholding tax obligations for businesses' },
  { id: 'bct5', categoryId: 12, title: 'International Tax Considerations', duration: '65m', thumbnail: 'https://images.pexels.com/photos/7651901/pexels-photo-7651901.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Cross-border tax issues for multinational corporations' },
];
