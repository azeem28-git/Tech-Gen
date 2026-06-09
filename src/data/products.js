export const categories = [
  { id: 'cpu', name: 'CPU', icon: '🖥️', desc: 'Processors' },
  { id: 'gpu', name: 'GPU', icon: '🎮', desc: 'Graphics Cards' },
  { id: 'motherboard', name: 'Motherboard', icon: '📋', desc: 'Mainboards' },
  { id: 'ram', name: 'RAM', icon: '💾', desc: 'Memory' },
  { id: 'ssd', name: 'SSD', icon: '💿', desc: 'Solid State' },
  { id: 'hdd', name: 'HDD', icon: '🗄️', desc: 'Hard Drives' },
  { id: 'psu', name: 'PSU', icon: '⚡', desc: 'Power Supply' },
  { id: 'cooler', name: 'Cooler', icon: '❄️', desc: 'CPU Cooling' },
  { id: 'cabinet', name: 'Cabinet', icon: '📦', desc: 'PC Cases' },
  { id: 'monitor', name: 'Monitor', icon: '🖥', desc: 'Displays' },
  { id: 'keyboard', name: 'Keyboard', icon: '⌨️', desc: 'Input' },
  { id: 'mouse', name: 'Mouse', icon: '🖱️', desc: 'Input' },
];

export const products = [
  // CPUs
  { id: 1, category: 'cpu', brand: 'AMD', name: 'Ryzen 9 7950X', desc: '16-Core 32-Thread, 4.5GHz Base, 5.7GHz Boost, AM5, 170W TDP', price: 49999, mrp: 57999, rating: 4.9, reviews: 312, stock: 15, badge: 'HOT', specs: { cores: '16C/32T', boost: '5.7GHz', socket: 'AM5', tdp: '170W', cache: '64MB L3' }, icon: '🖥️' },
  { id: 2, category: 'cpu', brand: 'Intel', name: 'Core i9-14900K', desc: '24-Core (8P+16E), 6.0GHz Boost, LGA1700, 253W TDP', price: 44999, mrp: 52000, rating: 4.8, reviews: 278, stock: 12, badge: '', specs: { cores: '24C/32T', boost: '6.0GHz', socket: 'LGA1700', tdp: '253W', cache: '36MB L3' }, icon: '🖥️' },
  { id: 3, category: 'cpu', brand: 'AMD', name: 'Ryzen 7 7700X', desc: '8-Core 16-Thread, 4.5GHz Base, 5.4GHz Boost, AM5, 105W', price: 24999, mrp: 29999, rating: 4.7, reviews: 445, stock: 28, badge: 'BESTSELLER', specs: { cores: '8C/16T', boost: '5.4GHz', socket: 'AM5', tdp: '105W', cache: '32MB L3' }, icon: '🖥️' },
  { id: 4, category: 'cpu', brand: 'AMD', name: 'Ryzen 5 7600', desc: '6-Core 12-Thread, 3.8GHz Base, 5.1GHz Boost, AM5, 65W', price: 16999, mrp: 20000, rating: 4.8, reviews: 523, stock: 42, badge: 'SALE', specs: { cores: '6C/12T', boost: '5.1GHz', socket: 'AM5', tdp: '65W', cache: '32MB L3' }, icon: '🖥️' },
  { id: 5, category: 'cpu', brand: 'Intel', name: 'Core i5-14600K', desc: '14-Core (6P+8E), 5.3GHz Boost, LGA1700, 125W TDP', price: 22999, mrp: 27500, rating: 4.7, reviews: 389, stock: 20, badge: '', specs: { cores: '14C/20T', boost: '5.3GHz', socket: 'LGA1700', tdp: '125W', cache: '24MB L3' }, icon: '🖥️' },

  // GPUs
  { id: 6, category: 'gpu', brand: 'NVIDIA', name: 'RTX 4090 24GB', desc: 'GDDR6X, 16384 CUDA Cores, 450W TDP, PCIe 4.0 x16', price: 159999, mrp: 189999, rating: 5.0, reviews: 145, stock: 5, badge: 'FLAGSHIP', specs: { vram: '24GB GDDR6X', cuda: '16384', tdp: '450W', boost: '2.52GHz', busWidth: '384-bit' }, icon: '🎮' },
  { id: 7, category: 'gpu', brand: 'NVIDIA', name: 'RTX 4080 Super 16GB', desc: 'GDDR6X, 10240 CUDA Cores, 320W TDP, DLSS 3.5', price: 89999, mrp: 104999, rating: 4.8, reviews: 223, stock: 9, badge: 'NEW', specs: { vram: '16GB GDDR6X', cuda: '10240', tdp: '320W', boost: '2.55GHz', busWidth: '256-bit' }, icon: '🎮' },
  { id: 8, category: 'gpu', brand: 'NVIDIA', name: 'RTX 4070 Ti Super', desc: '16GB GDDR6X, 8448 CUDA Cores, 285W, DLSS 3.5', price: 74999, mrp: 84999, rating: 4.7, reviews: 312, stock: 14, badge: '', specs: { vram: '16GB GDDR6X', cuda: '8448', tdp: '285W', boost: '2.61GHz', busWidth: '256-bit' }, icon: '🎮' },
  { id: 9, category: 'gpu', brand: 'NVIDIA', name: 'RTX 4060 Ti 16GB', desc: 'GDDR6, 4352 CUDA Cores, 165W, Great 1080p/1440p', price: 39999, mrp: 46999, rating: 4.6, reviews: 478, stock: 22, badge: 'SALE', specs: { vram: '16GB GDDR6', cuda: '4352', tdp: '165W', boost: '2.54GHz', busWidth: '128-bit' }, icon: '🎮' },
  { id: 10, category: 'gpu', brand: 'AMD', name: 'Radeon RX 7900 XTX', desc: '24GB GDDR6, 6144 SPs, 355W, Excellent 4K gaming', price: 84999, mrp: 94999, rating: 4.6, reviews: 189, stock: 7, badge: '', specs: { vram: '24GB GDDR6', shaders: '6144', tdp: '355W', boost: '2.5GHz', busWidth: '384-bit' }, icon: '🎮' },

  // Motherboards
  { id: 11, category: 'motherboard', brand: 'ASUS ROG', name: 'Maximus Z790 Hero', desc: 'LGA1700, DDR5, PCIe 5.0, WiFi 6E, 4x M.2, ATX', price: 42999, mrp: 49000, rating: 4.7, reviews: 98, stock: 8, badge: '', specs: { socket: 'LGA1700', formFactor: 'ATX', ddr: 'DDR5', m2Slots: '4x M.2', wifi: 'WiFi 6E' }, icon: '📋' },
  { id: 12, category: 'motherboard', brand: 'MSI', name: 'MAG X670E Tomahawk', desc: 'AM5, DDR5-6600+, PCIe 5.0, WiFi 6E, 3x M.2, ATX', price: 18999, mrp: 22500, rating: 4.8, reviews: 245, stock: 18, badge: 'BESTSELLER', specs: { socket: 'AM5', formFactor: 'ATX', ddr: 'DDR5', m2Slots: '3x M.2', wifi: 'WiFi 6E' }, icon: '📋' },
  { id: 13, category: 'motherboard', brand: 'Gigabyte', name: 'B650M DS3H', desc: 'AM5, DDR5, Micro-ATX, Budget-friendly AMD platform', price: 8999, mrp: 10999, rating: 4.5, reviews: 312, stock: 35, badge: 'BUDGET', specs: { socket: 'AM5', formFactor: 'mATX', ddr: 'DDR5', m2Slots: '2x M.2', wifi: 'No' }, icon: '📋' },

  // RAM
  { id: 14, category: 'ram', brand: 'Corsair', name: 'Dominator Titanium 32GB', desc: 'DDR5-6000, CL30, 2x16GB, RGB, Intel XMP 3.0', price: 14999, mrp: 18500, rating: 4.8, reviews: 156, stock: 24, badge: '', specs: { size: '32GB (2x16)', speed: 'DDR5-6000', cl: 'CL30', voltage: '1.35V', profile: 'XMP 3.0' }, icon: '💾' },
  { id: 15, category: 'ram', brand: 'G.Skill', name: 'Trident Z5 RGB 64GB', desc: 'DDR5-6400, CL32, 2x32GB, RGB, EXPO/XMP', price: 26999, mrp: 32000, rating: 4.7, reviews: 89, stock: 11, badge: '', specs: { size: '64GB (2x32)', speed: 'DDR5-6400', cl: 'CL32', voltage: '1.4V', profile: 'XMP/EXPO' }, icon: '💾' },
  { id: 16, category: 'ram', brand: 'Kingston', name: 'Fury Beast 32GB DDR5', desc: 'DDR5-5200, CL40, 2x16GB, Low-profile, Budget pick', price: 8999, mrp: 10999, rating: 4.6, reviews: 423, stock: 50, badge: 'SALE', specs: { size: '32GB (2x16)', speed: 'DDR5-5200', cl: 'CL40', voltage: '1.25V', profile: 'XMP 3.0' }, icon: '💾' },

  // SSDs
  { id: 17, category: 'ssd', brand: 'Samsung', name: '990 Pro 2TB NVMe', desc: 'PCIe 4.0 x4, 7450MB/s Read, 6900MB/s Write, M.2 2280', price: 12999, mrp: 17999, rating: 4.9, reviews: 534, stock: 30, badge: 'SALE', specs: { capacity: '2TB', interface: 'PCIe 4.0 x4', read: '7450 MB/s', write: '6900 MB/s', form: 'M.2 2280' }, icon: '💿' },
  { id: 18, category: 'ssd', brand: 'WD', name: 'Black SN850X 1TB', desc: 'PCIe 4.0 x4, 7300MB/s Read, 6600MB/s Write, Heatsink', price: 9999, mrp: 12999, rating: 4.8, reviews: 312, stock: 25, badge: '', specs: { capacity: '1TB', interface: 'PCIe 4.0 x4', read: '7300 MB/s', write: '6600 MB/s', form: 'M.2 2280' }, icon: '💿' },
  { id: 19, category: 'ssd', brand: 'Seagate', name: 'FireCuda 530 4TB', desc: 'PCIe 4.0 x4, 7300MB/s Read, Heatsink, PS5 Compatible', price: 27999, mrp: 34999, rating: 4.7, reviews: 145, stock: 10, badge: '', specs: { capacity: '4TB', interface: 'PCIe 4.0 x4', read: '7300 MB/s', write: '6900 MB/s', form: 'M.2 2280' }, icon: '💿' },

  // PSUs
  { id: 20, category: 'psu', brand: 'Corsair', name: 'RM1000x 1000W', desc: '80+ Gold, Fully Modular, Zero RPM Fan Mode, 10yr warranty', price: 13499, mrp: 16000, rating: 4.8, reviews: 289, stock: 16, badge: '', specs: { wattage: '1000W', efficiency: '80+ Gold', modular: 'Full', warranty: '10 Years', fanSize: '135mm' }, icon: '⚡' },
  { id: 21, category: 'psu', brand: 'Seasonic', name: 'Focus GX-850 850W', desc: '80+ Gold, Fully Modular, 10yr warranty, Hybrid fan', price: 9999, mrp: 12500, rating: 4.9, reviews: 412, stock: 22, badge: 'BESTSELLER', specs: { wattage: '850W', efficiency: '80+ Gold', modular: 'Full', warranty: '10 Years', fanSize: '120mm' }, icon: '⚡' },
  { id: 22, category: 'psu', brand: 'Corsair', name: 'HX1200i 1200W', desc: '80+ Platinum, Fully Modular, iCUE compatible, ATX 3.0', price: 19999, mrp: 24999, rating: 4.7, reviews: 134, stock: 8, badge: '', specs: { wattage: '1200W', efficiency: '80+ Platinum', modular: 'Full', warranty: '10 Years', fanSize: '140mm' }, icon: '⚡' },

  // Coolers
  { id: 23, category: 'cooler', brand: 'Noctua', name: 'NH-D15 Chromax Black', desc: 'Dual tower, 2x NF-A15 fans, 250W TDP, Universal socket', price: 8999, mrp: 10999, rating: 4.9, reviews: 267, stock: 12, badge: '', specs: { type: 'Air Cooler', fans: '2x 140mm', tdp: '250W', height: '165mm', noise: '24.6 dBA' }, icon: '❄️' },
  { id: 24, category: 'cooler', brand: 'Corsair', name: 'iCUE H150i Elite', desc: '360mm AIO, 3x LL120 RGB fans, iCUE control, AM5/LGA1700', price: 12999, mrp: 15999, rating: 4.7, reviews: 198, stock: 9, badge: 'RGB', specs: { type: '360mm AIO', fans: '3x 120mm RGB', tdp: '300W+', pump: 'Asetek Gen 7', noise: '37 dBA' }, icon: '❄️' },

  // Monitors
  { id: 25, category: 'monitor', brand: 'LG', name: '27GP950-B 27" 4K', desc: '4K UHD, 160Hz, IPS, 1ms GTG, G-Sync Compatible, HDR600', price: 44999, mrp: 54999, rating: 4.7, reviews: 178, stock: 7, badge: '', specs: { size: '27"', resolution: '3840x2160', panel: 'IPS', refreshRate: '160Hz', hdr: 'HDR600' }, icon: '🖥' },
  { id: 26, category: 'monitor', brand: 'Samsung', name: 'Odyssey G7 32"', desc: '32" QHD, 240Hz, VA Curved, 1ms, G-Sync, HDR600', price: 38999, mrp: 46999, rating: 4.6, reviews: 223, stock: 5, badge: 'GAMING', specs: { size: '32"', resolution: '2560x1440', panel: 'VA Curved', refreshRate: '240Hz', hdr: 'HDR600' }, icon: '🖥' },
];

export const prebuiltPCs = [
  {
    id: 'starter',
    tier: 'Starter Gaming',
    name: 'NOVA STARTER',
    tagline: 'Your gateway to PC gaming',
    icon: '🎮',
    price: 65999,
    badge: '',
    featured: false,
    specs: {
      cpu: 'AMD Ryzen 5 5600',
      gpu: 'NVIDIA RTX 3060 12GB',
      ram: '16GB DDR4-3200',
      storage: '512GB NVMe SSD',
      psu: '550W 80+ Gold',
      cabinet: 'Mid-Tower ATX',
    },
    warranty: '1 Year On-Site',
    fps: { cyberpunk: 65, warzone: 120, fifa: 144 },
    perfScore: 72,
  },
  {
    id: 'midrange',
    tier: 'Mid-Range Gaming',
    name: 'NOVA APEX',
    tagline: 'Dominate 1440p gaming',
    icon: '⚡',
    price: 124999,
    badge: 'MOST POPULAR',
    featured: true,
    specs: {
      cpu: 'AMD Ryzen 7 7700',
      gpu: 'NVIDIA RTX 4070 12GB',
      ram: '32GB DDR5-5600',
      storage: '1TB NVMe SSD',
      psu: '750W 80+ Gold',
      cabinet: 'Full-Tower ATX',
    },
    warranty: '2 Years On-Site',
    fps: { cyberpunk: 110, warzone: 180, fifa: 240 },
    perfScore: 88,
  },
  {
    id: 'pro',
    tier: 'Professional',
    name: 'NOVA TITAN',
    tagline: 'For creators & professionals',
    icon: '🚀',
    price: 249999,
    badge: 'PRO',
    featured: false,
    specs: {
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4080 16GB',
      ram: '64GB DDR5-6000',
      storage: '2TB NVMe SSD',
      psu: '1000W 80+ Platinum',
      cabinet: 'Full-Tower E-ATX',
    },
    warranty: '3 Years On-Site',
    fps: { cyberpunk: 165, warzone: 240, fifa: 240 },
    perfScore: 97,
  },
];

export const brands = ['AMD', 'Intel', 'NVIDIA', 'ASUS ROG', 'MSI', 'Gigabyte', 'Corsair', 'G.Skill', 'Kingston', 'Samsung', 'WD', 'Seagate', 'Noctua', 'LG', 'Seasonic'];
