import { sql } from 'drizzle-orm'
import pgdb, { pool } from '@/db/client.js'
import {
  adminDivisions,
  agentProfiles,
  amenities,
  cities,
  communities,
  countries,
  geoAliases,
  listingTypes,
  organizations,
  orgMembers,
  users,
} from '@/db/schema/index.js'

const ids = {
  agentProfile: 'a0000000-0000-4000-8000-000000000031',
  cityAbuDhabi: 'a0000000-0000-4000-8000-000000000011',
  cityAjman: 'a0000000-0000-4000-8000-000000000014',
  cityDubai: 'a0000000-0000-4000-8000-000000000012',
  cityFujairah: 'a0000000-0000-4000-8000-000000000017',
  cityRasAlKhaimah: 'a0000000-0000-4000-8000-000000000016',
  citySharjah: 'a0000000-0000-4000-8000-000000000013',
  cityUmmAlQuwain: 'a0000000-0000-4000-8000-000000000015',
  communityAlKhan: 'a0000000-0000-4000-8000-000000000023',
  communityCorniche: 'a0000000-0000-4000-8000-000000000024',
  communityDowntown: 'a0000000-0000-4000-8000-000000000022',
  communityMarina: 'a0000000-0000-4000-8000-000000000021',
  divisionAbuDhabi: 'a0000000-0000-4000-8000-000000000001',
  divisionAjman: 'a0000000-0000-4000-8000-000000000004',
  divisionDubai: 'a0000000-0000-4000-8000-000000000002',
  divisionFujairah: 'a0000000-0000-4000-8000-000000000007',
  divisionRasAlKhaimah: 'a0000000-0000-4000-8000-000000000006',
  divisionSharjah: 'a0000000-0000-4000-8000-000000000003',
  divisionUmmAlQuwain: 'a0000000-0000-4000-8000-000000000005',
  org: 'a0000000-0000-4000-8000-000000000030',
  orgMember: 'a0000000-0000-4000-8000-000000000032',
  uae: 'a0000000-0000-4000-8000-000000000000',
  user: 'a0000000-0000-4000-8000-000000000029',
} as const

const point = (lng: number, lat: number) =>
  sql`ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography`

const listingTypeRows = [
  {
    category: 'residential' as const,
    name: 'Apartment',
    slug: 'apartment',
    sortOrder: 1,
  },
  {
    category: 'residential' as const,
    name: 'Villa',
    slug: 'villa',
    sortOrder: 2,
  },
  {
    category: 'residential' as const,
    name: 'Townhouse',
    slug: 'townhouse',
    sortOrder: 3,
  },
  {
    category: 'residential' as const,
    name: 'Penthouse',
    slug: 'penthouse',
    sortOrder: 4,
  },
  {
    category: 'residential' as const,
    name: 'Hotel apartment',
    slug: 'hotel_apartment',
    sortOrder: 5,
  },
  {
    category: 'residential' as const,
    name: 'Compound',
    slug: 'compound',
    sortOrder: 6,
  },
  { category: 'land' as const, name: 'Plot', slug: 'plot', sortOrder: 7 },
  { category: 'land' as const, name: 'Land', slug: 'land', sortOrder: 8 },
  {
    category: 'commercial' as const,
    name: 'Office',
    slug: 'office',
    sortOrder: 9,
  },
  {
    category: 'commercial' as const,
    name: 'Retail',
    slug: 'retail',
    sortOrder: 10,
  },
  {
    category: 'commercial' as const,
    name: 'Warehouse',
    slug: 'warehouse',
    sortOrder: 11,
  },
  {
    category: 'commercial' as const,
    name: 'Shop',
    slug: 'shop',
    sortOrder: 12,
  },
  {
    category: 'commercial' as const,
    name: 'Labour camp',
    slug: 'labour_camp',
    sortOrder: 13,
  },
  {
    category: 'commercial' as const,
    name: 'Farm',
    slug: 'farm',
    sortOrder: 14,
  },
  {
    category: 'commercial' as const,
    name: 'Building',
    slug: 'building',
    sortOrder: 15,
  },
  {
    category: 'commercial' as const,
    name: 'Floor',
    slug: 'floor',
    sortOrder: 16,
  },
]

const amenityRows = [
  { name: 'Swimming pool', slug: 'pool', sortOrder: 1 },
  { name: 'Gym', slug: 'gym', sortOrder: 2 },
  { name: 'Central A/C', slug: 'central_ac', sortOrder: 3 },
  { name: "Maid's room", slug: 'maids_room', sortOrder: 4 },
  { name: 'Balcony', slug: 'balcony', sortOrder: 5 },
  { name: 'Pets allowed', slug: 'pets', sortOrder: 6 },
  { name: 'Smart home', slug: 'smart_home', sortOrder: 7 },
  { name: 'Concierge', slug: 'concierge', sortOrder: 8 },
  { name: 'Beach access', slug: 'beach_access', sortOrder: 9 },
  { name: 'Covered parking', slug: 'covered_parking', sortOrder: 10 },
  { name: 'Shared spa', slug: 'shared_spa', sortOrder: 11 },
  { name: 'Security', slug: 'security', sortOrder: 12 },
  { name: 'Study', slug: 'study', sortOrder: 13 },
  { name: 'Private garden', slug: 'private_garden', sortOrder: 14 },
]

async function seed() {
  await pgdb
    .insert(countries)
    .values({
      currency: 'AED',
      geog: point(54.3773, 24.4539),
      id: ids.uae,
      iso2: 'AE',
      iso3: 'ARE',
      lat: 24.4539,
      lng: 54.3773,
      measurementSystem: 'metric',
      name: 'United Arab Emirates',
      phoneCode: '+971',
      slug: 'united-arab-emirates',
    })
    .onConflictDoNothing()

  await pgdb
    .insert(adminDivisions)
    .values([
      {
        countryId: ids.uae,
        geog: point(54.3773, 24.4539),
        id: ids.divisionAbuDhabi,
        lat: 24.4539,
        lng: 54.3773,
        name: 'Abu Dhabi',
        slug: 'abu-dhabi',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(55.2708, 25.2048),
        id: ids.divisionDubai,
        lat: 25.2048,
        lng: 55.2708,
        name: 'Dubai',
        slug: 'dubai',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(55.4209, 25.3463),
        id: ids.divisionSharjah,
        lat: 25.3463,
        lng: 55.4209,
        name: 'Sharjah',
        slug: 'sharjah',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(55.5136, 25.4052),
        id: ids.divisionAjman,
        lat: 25.4052,
        lng: 55.5136,
        name: 'Ajman',
        slug: 'ajman',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(55.5534, 25.5647),
        id: ids.divisionUmmAlQuwain,
        lat: 25.5647,
        lng: 55.5534,
        name: 'Umm Al Quwain',
        slug: 'umm-al-quwain',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(55.9432, 25.7896),
        id: ids.divisionRasAlKhaimah,
        lat: 25.7896,
        lng: 55.9432,
        name: 'Ras Al Khaimah',
        slug: 'ras-al-khaimah',
        type: 'emirate',
      },
      {
        countryId: ids.uae,
        geog: point(56.3265, 25.1288),
        id: ids.divisionFujairah,
        lat: 25.1288,
        lng: 56.3265,
        name: 'Fujairah',
        slug: 'fujairah',
        type: 'emirate',
      },
    ])
    .onConflictDoNothing()

  await pgdb
    .insert(cities)
    .values([
      {
        countryId: ids.uae,
        divisionId: ids.divisionAbuDhabi,
        geog: point(54.3773, 24.4539),
        id: ids.cityAbuDhabi,
        lat: 24.4539,
        lng: 54.3773,
        name: 'Abu Dhabi',
        slug: 'abu-dhabi',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionDubai,
        geog: point(55.2708, 25.2048),
        id: ids.cityDubai,
        lat: 25.2048,
        lng: 55.2708,
        name: 'Dubai',
        slug: 'dubai',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionSharjah,
        geog: point(55.4209, 25.3463),
        id: ids.citySharjah,
        lat: 25.3463,
        lng: 55.4209,
        name: 'Sharjah',
        slug: 'sharjah',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionAjman,
        geog: point(55.5136, 25.4052),
        id: ids.cityAjman,
        lat: 25.4052,
        lng: 55.5136,
        name: 'Ajman',
        slug: 'ajman',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionUmmAlQuwain,
        geog: point(55.5534, 25.5647),
        id: ids.cityUmmAlQuwain,
        lat: 25.5647,
        lng: 55.5534,
        name: 'Umm Al Quwain',
        slug: 'umm-al-quwain',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionRasAlKhaimah,
        geog: point(55.9432, 25.7896),
        id: ids.cityRasAlKhaimah,
        lat: 25.7896,
        lng: 55.9432,
        name: 'Ras Al Khaimah',
        slug: 'ras-al-khaimah',
      },
      {
        countryId: ids.uae,
        divisionId: ids.divisionFujairah,
        geog: point(56.3265, 25.1288),
        id: ids.cityFujairah,
        lat: 25.1288,
        lng: 56.3265,
        name: 'Fujairah',
        slug: 'fujairah',
      },
    ])
    .onConflictDoNothing()

  await pgdb
    .insert(communities)
    .values([
      {
        cityId: ids.cityDubai,
        description: 'Waterfront towers, marina walk, and high-rise living.',
        geog: point(55.1413, 25.0805),
        id: ids.communityMarina,
        lat: 25.0805,
        lng: 55.1413,
        name: 'Dubai Marina',
        slug: 'dubai-marina',
      },
      {
        cityId: ids.cityDubai,
        description:
          'Burj Khalifa district with retail, dining, and landmarks.',
        geog: point(55.2744, 25.1972),
        id: ids.communityDowntown,
        lat: 25.1972,
        lng: 55.2744,
        name: 'Downtown Dubai',
        slug: 'downtown-dubai',
      },
      {
        cityId: ids.citySharjah,
        description: 'Lagoon-side residential area close to the corniche.',
        geog: point(55.388, 25.329),
        id: ids.communityAlKhan,
        lat: 25.329,
        lng: 55.388,
        name: 'Al Khan',
        slug: 'al-khan',
      },
      {
        cityId: ids.cityAbuDhabi,
        description: 'Waterfront boulevard and established city apartments.',
        geog: point(54.352, 24.4764),
        id: ids.communityCorniche,
        lat: 24.4764,
        lng: 54.352,
        name: 'Corniche',
        slug: 'corniche',
      },
    ])
    .onConflictDoNothing()

  await pgdb
    .insert(geoAliases)
    .values([
      {
        alias: 'DXB',
        locale: 'en',
        targetId: ids.cityDubai,
        targetType: 'city',
      },
      {
        alias: 'Dubai',
        locale: 'en',
        targetId: ids.cityDubai,
        targetType: 'city',
      },
      {
        alias: 'دبي',
        locale: 'ar',
        targetId: ids.cityDubai,
        targetType: 'city',
      },
      {
        alias: 'AUH',
        locale: 'en',
        targetId: ids.cityAbuDhabi,
        targetType: 'city',
      },
      {
        alias: 'UAE',
        locale: 'en',
        targetId: ids.uae,
        targetType: 'country',
      },
    ])
    .onConflictDoNothing()

  await pgdb.insert(listingTypes).values(listingTypeRows).onConflictDoNothing()
  await pgdb.insert(amenities).values(amenityRows).onConflictDoNothing()

  await pgdb
    .insert(users)
    .values({
      cognitoSub: 'seed-demo-manager',
      displayName: 'Sara Al Maktoum',
      email: 'sara@realstate.example',
      id: ids.user,
      platformRole: 'user',
      preferredCurrency: 'AED',
      status: 'active',
    })
    .onConflictDoNothing()

  await pgdb
    .insert(organizations)
    .values({
      cityId: ids.cityDubai,
      countryId: ids.uae,
      email: 'hello@realstate.example',
      id: ids.org,
      legalName: 'Real State Brokerage LLC',
      licenseAuthority: 'RERA',
      licenseCountryId: ids.uae,
      licenseNumber: 'ORN-10001',
      phone: '+97140000000',
      slug: 'real-state-brokerage',
      status: 'active',
      tradeName: 'Real State Brokerage',
      type: 'agency',
      verificationStatus: 'verified',
      website: 'https://realstate.example',
    })
    .onConflictDoNothing()

  await pgdb
    .insert(orgMembers)
    .values({
      id: ids.orgMember,
      invitedAt: new Date(),
      jobTitle: 'Managing Broker',
      joinedAt: new Date(),
      orgId: ids.org,
      role: 'owner',
      status: 'active',
      userId: ids.user,
    })
    .onConflictDoNothing()

  await pgdb
    .insert(agentProfiles)
    .values({
      bio: 'Residential specialist covering Dubai Marina and Downtown.',
      id: ids.agentProfile,
      isVerified: true,
      languages: ['en', 'ar'],
      licenseNumber: 'BRN-55001',
      orgId: ids.org,
      slug: 'sara-al-maktoum',
      userId: ids.user,
      whatsapp: '+97150000000',
    })
    .onConflictDoNothing()

  console.log('Seed complete')
}

seed()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await pool.end()
  })
