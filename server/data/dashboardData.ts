export const dashboardData = {
  metrics: {
    totalRevenue: "$842,924",
    revenueFormatted: "$772,658.00",
    dealsCount: "$324",
    conversionRate: "18.2%",
    activeLeads: "1,842"
  },
  
  blendedMetrics: {
    valuation: {
      dcfEquityValue: "$1,653,358,129.81",
      sharePrice: "$1,653.36"
    },
    profitability: {
      profitPerCustomerPerMonth: "$3,178.47",
      renewalProfitPerCustomerPerMonth: "$35,631.90",
      renewalProfitPerCustomerPerDay: "$1,171.72",
      contributionAfterMarketing: "$33,551.12",
      contributionMarginBeforeMarketing: "90.0%",
      contributionMarginAfterMarketing: "74.31%",
      profitPerCustomerPerDay: "$104.52"
    },
    financialMetrics: {
      cashBelowOperatingDay: "Day 1",
      cashInBank: "$0.00",
      assets: "$0.00",
      liabilities: "$0.00",
      debt: "$0.00",
      debtInterestRate: "6.0%",
      costOfDebtDaily: "$0.00",
      costOfDebtMonthly: "$0.00"
    },
    customerMetrics: {
      customerCount: "0 Customers",
      totalAddressableMarket: "Not specified",
      lifetimeValue: "$93,000.00",
      customerAcquisitionCost: "$7,085.23",
      ltvCacRatio: "13.13",
      customerAcquisitionRateDaily: "5.26 Customers",
      customerAcquisitionRateMonthly: "160.0 Customers",
      consumptionPerCustomer: "$8,193.09"
    },
    productAcquisitionCosts: {
      initialOffer: {
        expectedValueOfOfferPrice: "$45,151.50",
        costToFulfill: "$4,515.15",
        costToMarket: "$312.50",
        costToSell: "$6,772.73"
      },
      renewals: {
        expectedValueOfRenewalPrice: "$45,151.50",
        costToFulfillRenewal: "$5,000.00",
        costToSellRenewal: "$5,000.00"
      }
    },
    businessModelingInbound: {
      mediaSpendPerDay: "$1,644.20",
      leadsPerDay: "65.77",
      leadsPerMonth: "2000.0",
      costPerLead: "$25.00",
      customersPerDay: "5.26",
      customersPerMonth: "160.0",
      costPerClick: "$0.50",
      inboundCostPerCustomer: "$7,085.23"
    },
    businessModelingBlended: {
      blendedLeadsPerDay: "65.77",
      blendedLeadsPerMonth: "2000.0",
      outboundLeadRatio: "0.0%",
      inboundLeadRatio: "100.0%",
      organicLeadRatio: "0.0%",
      blendedCostPerLead: "$25.00",
      blendedLeadConversionRate: "8.0%",
      blendedCustomersPerDay: "5.26",
      blendedCustomersPerMonth: "160.0",
      timeToMarketBlended: "1.0 Days",
      costToMarketBlended: "$312.50"
    },
    administrationFixedCosts: {
      fixedCostsPerDay: "$3,288.39",
      fixedCostsPerMonth: "$100,000.00",
      fixedCostIncreasePerHundredCustomers: "$0.00"
    },
    salesWorkforce: {
      salesRepsNeeded: "160"
    }
  },
  salesData: [
    { name: "Jan", revenue: 65000, transactions: 145 },
    { name: "Feb", revenue: 72000, transactions: 156 },
    { name: "Mar", revenue: 68000, transactions: 142 },
    { name: "Apr", revenue: 83000, transactions: 168 },
    { name: "May", revenue: 75000, transactions: 154 },
    { name: "Jun", revenue: 92000, transactions: 187 },
    { name: "Jul", revenue: 85000, transactions: 172 },
    { name: "Aug", revenue: 97000, transactions: 198 },
    { name: "Sep", revenue: 90000, transactions: 183 },
    { name: "Oct", revenue: 102000, transactions: 214 },
    { name: "Nov", revenue: 95000, transactions: 192 },
    { name: "Dec", revenue: 110000, transactions: 228 }
  ],
  funnelStages: [
    { name: "Prospects", value: 732, percentage: 100 },
    { name: "Qualified", value: 528, percentage: 85 },
    { name: "Proposals", value: 342, percentage: 65 },
    { name: "Negotiations", value: 210, percentage: 45 },
    { name: "Closed", value: 124, percentage: 25 }
  ],
  funnelLabels: ["Awareness", "Interest", "Desire", "Action", "Loyalty"],
  geoData: {
    totalRevenue: "$4,382,437",
    coverage: "18.2%"
  },
  additionalCharts: {
    freeCashFlow: [
      { name: "Jan", value: 125000, dailyValues: [4100, 4300, 4000, 4200, 4150, 4250, 4050, 4100, 4300, 4200, 4150, 4200, 4050, 4100, 4300, 4000, 4200, 4150, 4250, 4050, 4100, 4300, 4200, 4150, 4200, 4050, 4100, 4300, 4000, 4200] },
      { name: "Feb", value: 142000, dailyValues: [4300, 4500, 4800, 4600, 4700, 4900, 4750, 4800, 5000, 4900, 4750, 4800, 4900, 4950, 5100, 5000, 4950, 4900, 5050, 5100, 5200, 5100, 5050, 5200, 5150, 5100, 5250, 5300] },
      { name: "Mar", value: 138000, dailyValues: [4900, 4700, 4500, 4600, 4450, 4400, 4500, 4550, 4600, 4500, 4450, 4400, 4350, 4400, 4450, 4500, 4550, 4600, 4500, 4450, 4500, 4550, 4600, 4650, 4700, 4650, 4600, 4650, 4700, 4750, 4800] },
      { name: "Apr", value: 165000, dailyValues: [5200, 5300, 5400, 5500, 5600, 5500, 5400, 5500, 5600, 5700, 5600, 5500, 5600, 5700, 5800, 5700, 5600, 5700, 5800, 5900, 5800, 5700, 5800, 5900, 6000, 5900, 5800, 5900, 6000, 6100] },
      { name: "May", value: 178000, dailyValues: [6000, 6100, 5900, 6000, 6100, 6200, 6100, 6000, 6100, 6200, 6300, 6200, 6100, 6200, 6300, 6400, 6300, 6200, 6300, 6400, 6500, 6400, 6300, 6400, 6500, 6600, 6500, 6400, 6500, 6600, 6700] },
      { name: "Jun", value: 192000, dailyValues: [6500, 6600, 6700, 6800, 6700, 6600, 6700, 6800, 6900, 6800, 6700, 6800, 6900, 7000, 6900, 6800, 6900, 7000, 7100, 7000, 6900, 7000, 7100, 7200, 7100, 7000, 7100, 7200, 7300, 7200] },
      { name: "Jul", value: 185000, dailyValues: [6800, 6700, 6600, 6700, 6800, 6700, 6600, 6500, 6600, 6700, 6600, 6500, 6600, 6700, 6800, 6700, 6600, 6700, 6800, 6900, 6800, 6700, 6800, 6900, 7000, 6900, 6800, 6900, 7000, 7100, 7000] },
      { name: "Aug", value: 210000, dailyValues: [7000, 7100, 7200, 7300, 7400, 7300, 7200, 7300, 7400, 7500, 7400, 7300, 7400, 7500, 7600, 7500, 7400, 7500, 7600, 7700, 7600, 7500, 7600, 7700, 7800, 7700, 7600, 7700, 7800, 7900, 7800] },
      { name: "Sep", value: 205000, dailyValues: [7500, 7400, 7300, 7400, 7500, 7400, 7300, 7400, 7500, 7600, 7500, 7400, 7500, 7600, 7700, 7600, 7500, 7600, 7700, 7800, 7700, 7600, 7700, 7800, 7900, 7800, 7700, 7800, 7900, 8000] },
      { name: "Oct", value: 225000, dailyValues: [8000, 8100, 8200, 8300, 8200, 8100, 8200, 8300, 8400, 8300, 8200, 8300, 8400, 8500, 8400, 8300, 8400, 8500, 8600, 8500, 8400, 8500, 8600, 8700, 8600, 8500, 8600, 8700, 8800, 8700, 8600] },
      { name: "Nov", value: 232000, dailyValues: [8500, 8600, 8700, 8800, 8700, 8600, 8700, 8800, 8900, 8800, 8700, 8800, 8900, 9000, 8900, 8800, 8900, 9000, 9100, 9000, 8900, 9000, 9100, 9200, 9100, 9000, 9100, 9200, 9300, 9200] },
      { name: "Dec", value: 250000, dailyValues: [9000, 9100, 9200, 9300, 9400, 9300, 9200, 9300, 9400, 9500, 9400, 9300, 9400, 9500, 9600, 9500, 9400, 9500, 9600, 9700, 9600, 9500, 9600, 9700, 9800, 9700, 9600, 9700, 9800, 9900, 9800] }
    ],
    renewalCustomers: [
      { name: "Jan", value: 25, dailyValues: [0, 1, 0, 2, 1, 0, 1, 0, 2, 1, 1, 2, 0, 1, 1, 2, 0, 1, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 0, 2, 1] },
      { name: "Feb", value: 32, dailyValues: [1, 2, 1, 0, 1, 2, 1, 1, 2, 0, 1, 2, 1, 2, 1, 1, 2, 0, 1, 1, 2, 1, 2, 1, 0, 1, 2, 1] },
      { name: "Mar", value: 37, dailyValues: [1, 1, 2, 1, 0, 2, 1, 1, 2, 1, 0, 1, 1, 2, 1, 2, 1, 0, 2, 1, 2, 1, 1, 2, 0, 1, 2, 1, 0, 1, 2] },
      { name: "Apr", value: 45, dailyValues: [2, 1, 2, 1, 1, 2, 0, 2, 1, 2, 1, 1, 2, 1, 2, 0, 1, 2, 1, 2, 1, 1, 2, 1, 2, 0, 1, 2, 2, 1] },
      { name: "May", value: 58, dailyValues: [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 3, 2, 1, 2, 1, 2, 2, 1, 2, 1, 3, 2, 1, 2, 2, 3, 2, 1, 2] },
      { name: "Jun", value: 67, dailyValues: [2, 3, 2, 1, 2, 2, 3, 2, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 2, 2, 1, 2, 3, 2, 2, 2, 3, 2, 2, 1] },
      { name: "Jul", value: 72, dailyValues: [2, 3, 2, 2, 3, 2, 2, 1, 3, 2, 2, 3, 2, 2, 1, 3, 2, 2, 3, 2, 2, 3, 2, 2, 1, 3, 2, 2, 3, 2, 2] },
      { name: "Aug", value: 85, dailyValues: [3, 2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 3, 2, 3, 2, 2, 3, 2, 3, 2, 3, 2, 2, 3, 3, 3, 2, 3, 3, 2, 3] },
      { name: "Sep", value: 93, dailyValues: [3, 3, 2, 3, 4, 3, 2, 3, 3, 2, 3, 4, 3, 3, 2, 3, 4, 3, 3, 2, 3, 3, 2, 3, 4, 3, 3, 2, 3, 3] },
      { name: "Oct", value: 108, dailyValues: [4, 3, 3, 4, 3, 3, 2, 4, 3, 4, 3, 3, 4, 3, 3, 4, 3, 4, 3, 3, 4, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4] },
      { name: "Nov", value: 121, dailyValues: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4] },
      { name: "Dec", value: 137, dailyValues: [4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 5] }
    ],
    totalCustomers: [
      { name: "Jan", value: 1520, dailyValues: [1452, 1455, 1457, 1462, 1465, 1469, 1472, 1475, 1480, 1483, 1486, 1490, 1493, 1495, 1498, 1502, 1505, 1508, 1510, 1512, 1514, 1516, 1518, 1520, 1522, 1524, 1525, 1527, 1530, 1532, 1535] },
      { name: "Feb", value: 1585, dailyValues: [1538, 1542, 1545, 1548, 1550, 1553, 1556, 1559, 1562, 1564, 1567, 1570, 1573, 1575, 1578, 1580, 1582, 1585, 1587, 1590, 1592, 1594, 1596, 1598, 1600, 1602, 1604, 1606] },
      { name: "Mar", value: 1645, dailyValues: [1608, 1610, 1612, 1614, 1617, 1620, 1622, 1624, 1626, 1628, 1630, 1632, 1634, 1636, 1638, 1640, 1642, 1644, 1646, 1648, 1650, 1652, 1654, 1656, 1658, 1660, 1662, 1664, 1666, 1668, 1670] },
      { name: "Apr", value: 1725, dailyValues: [1673, 1676, 1679, 1682, 1685, 1688, 1691, 1694, 1697, 1700, 1702, 1705, 1708, 1710, 1712, 1715, 1718, 1720, 1722, 1725, 1727, 1730, 1732, 1735, 1737, 1740, 1742, 1745, 1747, 1750] },
      { name: "May", value: 1820, dailyValues: [1753, 1756, 1760, 1763, 1766, 1770, 1773, 1776, 1780, 1783, 1786, 1790, 1793, 1796, 1800, 1803, 1806, 1810, 1813, 1816, 1820, 1823, 1826, 1830, 1833, 1836, 1840, 1843, 1846, 1850, 1853] },
      { name: "Jun", value: 1925, dailyValues: [1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896, 1900, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972] },
      { name: "Jul", value: 2010, dailyValues: [1975, 1978, 1981, 1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017, 2020, 2023, 2026, 2029, 2032, 2035, 2038, 2041, 2044, 2047, 2050, 2053, 2056, 2059, 2062, 2065] },
      { name: "Aug", value: 2092, dailyValues: [2068, 2071, 2074, 2077, 2080, 2083, 2086, 2089, 2092, 2095, 2098, 2101, 2104, 2107, 2110, 2113, 2116, 2119, 2122, 2125, 2128, 2131, 2134, 2137, 2140, 2143, 2146, 2149, 2152, 2155, 2158] },
      { name: "Sep", value: 2175, dailyValues: [2161, 2164, 2167, 2170, 2173, 2176, 2179, 2182, 2185, 2188, 2191, 2194, 2197, 2200, 2203, 2206, 2209, 2212, 2215, 2218, 2221, 2224, 2227, 2230, 2233, 2236, 2239, 2242, 2245, 2248] },
      { name: "Oct", value: 2260, dailyValues: [2251, 2254, 2257, 2260, 2263, 2266, 2269, 2272, 2275, 2278, 2281, 2284, 2287, 2290, 2293, 2296, 2299, 2302, 2305, 2308, 2311, 2314, 2317, 2320, 2323, 2326, 2329, 2332, 2335, 2338, 2341] },
      { name: "Nov", value: 2350, dailyValues: [2344, 2347, 2350, 2353, 2356, 2359, 2362, 2365, 2368, 2371, 2374, 2377, 2380, 2383, 2386, 2389, 2392, 2395, 2398, 2401, 2404, 2407, 2410, 2413, 2416, 2419, 2422, 2425, 2428, 2431] },
      { name: "Dec", value: 2450, dailyValues: [2434, 2437, 2440, 2443, 2446, 2449, 2452, 2455, 2458, 2461, 2464, 2467, 2470, 2473, 2476, 2479, 2482, 2485, 2488, 2491, 2494, 2497, 2500, 2503, 2506, 2509, 2512, 2515, 2518, 2521, 2524] }
    ]
  },
  
  productPerformance: {
    growthData: [
      { name: "Jan", growth: 10 },
      { name: "Feb", growth: 15 },
      { name: "Mar", growth: 20 },
      { name: "Apr", growth: 25 },
      { name: "May", growth: 30 },
      { name: "Jun", growth: 40 },
      { name: "Jul", growth: 45 },
      { name: "Aug", growth: 55 },
      { name: "Sep", growth: 60 },
      { name: "Oct", growth: 70 },
      { name: "Nov", growth: 75 },
      { name: "Dec", growth: 80 }
    ],
    conversionData: [
      { name: "Jan", conversion: 8 },
      { name: "Feb", conversion: 12 },
      { name: "Mar", conversion: 10 },
      { name: "Apr", conversion: 15 },
      { name: "May", conversion: 20 },
      { name: "Jun", conversion: 25 },
      { name: "Jul", conversion: 30 },
      { name: "Aug", conversion: 35 },
      { name: "Sep", conversion: 40 },
      { name: "Oct", conversion: 45 },
      { name: "Nov", conversion: 50 },
      { name: "Dec", conversion: 55 }
    ]
  },
  insights: [
    {
      title: "Our analysis indicates a growth by 17.5% over the past quarter based on current trends.",
      description: "Demo forecasts show that optimizing your pricing strategy could increase conversion rates by up to 22%.",
      icon: "info"
    },
    {
      title: "Promo performance has decreased by 5% in the Northeast region.",
      description: "Consider adjusting your marketing mix for this region by increasing digital ad spend by 12%.",
      icon: "eye"
    }
  ],
  leadSources: [
    { name: "Organic", count: 452, percentage: 65 },
    { name: "Paid Search", count: 327, percentage: 42 },
    { name: "Referral", count: 197, percentage: 38 },
    { name: "Display", count: 134, percentage: 28 },
    { name: "Direct", count: 126, percentage: 26 },
    { name: "Social Networks", count: 74, percentage: 14 }
  ],
  performers: [
    {
      id: 1,
      name: "Jennifer Gonzalez",
      region: "West",
      email: "jennifer@example.com",
      revenue: 76072,
      status: "Team Manager",
      avatarColor: "purple",
      initials: "JG"
    },
    {
      id: 2,
      name: "Michael Martinez",
      region: "South",
      email: "michael@example.com",
      revenue: 62493,
      status: "Senior Advisor",
      avatarColor: "blue",
      initials: "MM"
    },
    {
      id: 3,
      name: "David Miller",
      region: "Midwest",
      email: "david@example.com",
      revenue: 57482,
      status: "Senior",
      avatarColor: "green",
      initials: "DM"
    },
    {
      id: 4,
      name: "Sarah Johnson",
      region: "Northeast",
      email: "sarah@example.com",
      revenue: 51473,
      status: "Sales Representative",
      avatarColor: "red",
      initials: "SJ"
    },
    {
      id: 5,
      name: "Chris Lee",
      region: "West",
      email: "chris@example.com",
      revenue: 48985,
      status: "Junior",
      avatarColor: "purple",
      initials: "CL"
    },
    {
      id: 6,
      name: "Emily Harris",
      region: "South",
      email: "emily@example.com",
      revenue: 46294,
      status: "Mid-level",
      avatarColor: "yellow",
      initials: "EH"
    }
  ],
  models: [
    {
      id: 1,
      name: "Premium Enterprise",
      category: "Enterprise",
      metrics: {
        ltv: 93000,
        cac: 7085.23,
        conversionRate: 8.7,
        revenuePerCustomer: 45151.50
      },
      status: "Active",
      efficiency: "high"
    },
    {
      id: 2,
      name: "Mid-Tier Business",
      category: "Business",
      metrics: {
        ltv: 65000,
        cac: 5200,
        conversionRate: 7.2,
        revenuePerCustomer: 28750
      },
      status: "Active",
      efficiency: "high"
    },
    {
      id: 3,
      name: "Starter Package",
      category: "Small Business",
      metrics: {
        ltv: 24000,
        cac: 2100,
        conversionRate: 6.4,
        revenuePerCustomer: 9600
      },
      status: "Active",
      efficiency: "medium"
    },
    {
      id: 4,
      name: "Custom Solution",
      category: "Enterprise",
      metrics: {
        ltv: 120000,
        cac: 15000,
        conversionRate: 4.1,
        revenuePerCustomer: 60000
      },
      status: "Beta",
      efficiency: "medium"
    },
    {
      id: 5,
      name: "Freemium Tier",
      category: "Small Business",
      metrics: {
        ltv: 12000,
        cac: 800,
        conversionRate: 2.8,
        revenuePerCustomer: 4800
      },
      status: "Active",
      efficiency: "high"
    },
    {
      id: 6,
      name: "Legacy Enterprise",
      category: "Enterprise",
      metrics: {
        ltv: 72000,
        cac: 8500,
        conversionRate: 3.2,
        revenuePerCustomer: 42000
      },
      status: "Deprecated",
      efficiency: "low"
    }
  ]
};
