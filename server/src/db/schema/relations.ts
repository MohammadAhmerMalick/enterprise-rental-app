import { defineRelations } from 'drizzle-orm'
import {
  amenities,
  buildings,
  listingAmenities,
  listingMedia,
  listingPriceHistory,
  listingStatusEvents,
  listings,
  listingTranslations,
  listingTypes,
  units,
} from '@/db/schema/catalog.js'
import {
  agentReviews,
  compareItems,
  compareSets,
  leadEvents,
  leads,
  recentlyViewed,
  savedListings,
  savedSearches,
  viewings,
} from '@/db/schema/demand.js'
import {
  adminDivisions,
  cities,
  communities,
  countries,
  geoAliases,
  subCommunities,
} from '@/db/schema/geography.js'
import {
  agentProfiles,
  agentServiceAreas,
  organizations,
  orgMembers,
  users,
} from '@/db/schema/identity.js'
import {
  auditLogs,
  creditTransactions,
  creditWallets,
  listingModerationQueue,
  listingPromotions,
  orgSubscriptions,
  subscriptionPlans,
} from '@/db/schema/ops.js'
import { projects, projectUnitTypes } from '@/db/schema/projects.js'

export const relations = defineRelations(
  {
    adminDivisions,
    agentProfiles,
    agentReviews,
    agentServiceAreas,
    amenities,
    auditLogs,
    buildings,
    cities,
    communities,
    compareItems,
    compareSets,
    countries,
    creditTransactions,
    creditWallets,
    geoAliases,
    leadEvents,
    leads,
    listingAmenities,
    listingMedia,
    listingModerationQueue,
    listingPriceHistory,
    listingPromotions,
    listingStatusEvents,
    listings,
    listingTranslations,
    listingTypes,
    organizations,
    orgMembers,
    orgSubscriptions,
    projects,
    projectUnitTypes,
    recentlyViewed,
    savedListings,
    savedSearches,
    subCommunities,
    subscriptionPlans,
    units,
    users,
    viewings,
  },
  (r) => ({
    adminDivisions: {
      cities: r.many.cities(),
      country: r.one.countries({
        from: r.adminDivisions.countryId,
        to: r.countries.id,
      }),
    },
    agentProfiles: {
      organization: r.one.organizations({
        from: r.agentProfiles.orgId,
        to: r.organizations.id,
      }),
      reviews: r.many.agentReviews(),
      serviceAreas: r.many.agentServiceAreas(),
      user: r.one.users({
        from: r.agentProfiles.userId,
        to: r.users.id,
      }),
    },
    agentReviews: {
      agentProfile: r.one.agentProfiles({
        from: r.agentReviews.agentProfileId,
        to: r.agentProfiles.id,
      }),
      lead: r.one.leads({
        from: r.agentReviews.leadId,
        optional: true,
        to: r.leads.id,
      }),
      reviewer: r.one.users({
        from: r.agentReviews.reviewerUserId,
        to: r.users.id,
      }),
    },
    agentServiceAreas: {
      agentProfile: r.one.agentProfiles({
        from: r.agentServiceAreas.agentProfileId,
        to: r.agentProfiles.id,
      }),
      community: r.one.communities({
        from: r.agentServiceAreas.communityId,
        to: r.communities.id,
      }),
    },
    amenities: {
      listings: r.many.listings({
        from: r.amenities.id.through(r.listingAmenities.amenityId),
        to: r.listings.id.through(r.listingAmenities.listingId),
      }),
    },
    auditLogs: {
      actor: r.one.users({
        from: r.auditLogs.actorUserId,
        optional: true,
        to: r.users.id,
      }),
    },
    buildings: {
      community: r.one.communities({
        from: r.buildings.communityId,
        to: r.communities.id,
      }),
      developer: r.one.organizations({
        from: r.buildings.developerOrgId,
        optional: true,
        to: r.organizations.id,
      }),
      listings: r.many.listings(),
      subCommunity: r.one.subCommunities({
        from: r.buildings.subCommunityId,
        optional: true,
        to: r.subCommunities.id,
      }),
      units: r.many.units(),
    },
    cities: {
      communities: r.many.communities(),
      country: r.one.countries({
        from: r.cities.countryId,
        to: r.countries.id,
      }),
      division: r.one.adminDivisions({
        from: r.cities.divisionId,
        optional: true,
        to: r.adminDivisions.id,
      }),
      listings: r.many.listings(),
      organizations: r.many.organizations(),
    },
    communities: {
      buildings: r.many.buildings(),
      city: r.one.cities({
        from: r.communities.cityId,
        to: r.cities.id,
      }),
      listings: r.many.listings(),
      serviceAgents: r.many.agentServiceAreas(),
      subCommunities: r.many.subCommunities(),
    },
    compareItems: {
      listing: r.one.listings({
        from: r.compareItems.listingId,
        to: r.listings.id,
      }),
      set: r.one.compareSets({
        from: r.compareItems.setId,
        to: r.compareSets.id,
      }),
    },
    compareSets: {
      items: r.many.compareItems(),
      user: r.one.users({
        from: r.compareSets.userId,
        to: r.users.id,
      }),
    },
    countries: {
      cities: r.many.cities(),
      divisions: r.many.adminDivisions(),
      listings: r.many.listings(),
      organizations: r.many.organizations({
        alias: 'org_hq_country',
        from: r.countries.id,
        to: r.organizations.countryId,
      }),
    },
    creditTransactions: {
      listing: r.one.listings({
        from: r.creditTransactions.listingId,
        optional: true,
        to: r.listings.id,
      }),
      wallet: r.one.creditWallets({
        from: r.creditTransactions.walletId,
        to: r.creditWallets.id,
      }),
    },
    creditWallets: {
      organization: r.one.organizations({
        from: r.creditWallets.orgId,
        to: r.organizations.id,
      }),
      transactions: r.many.creditTransactions(),
    },
    leadEvents: {
      actor: r.one.users({
        from: r.leadEvents.actorUserId,
        optional: true,
        to: r.users.id,
      }),
      lead: r.one.leads({
        from: r.leadEvents.leadId,
        to: r.leads.id,
      }),
    },
    leads: {
      agent: r.one.users({
        alias: 'lead_agent',
        from: r.leads.agentUserId,
        to: r.users.id,
      }),
      assignedTo: r.one.users({
        alias: 'lead_assigned_to',
        from: r.leads.assignedToUserId,
        optional: true,
        to: r.users.id,
      }),
      events: r.many.leadEvents(),
      fromUser: r.one.users({
        alias: 'lead_from_user',
        from: r.leads.fromUserId,
        optional: true,
        to: r.users.id,
      }),
      listing: r.one.listings({
        from: r.leads.listingId,
        to: r.listings.id,
      }),
      organization: r.one.organizations({
        from: r.leads.orgId,
        to: r.organizations.id,
      }),
      viewings: r.many.viewings(),
    },
    listingAmenities: {
      amenity: r.one.amenities({
        from: r.listingAmenities.amenityId,
        to: r.amenities.id,
      }),
      listing: r.one.listings({
        from: r.listingAmenities.listingId,
        to: r.listings.id,
      }),
    },
    listingMedia: {
      listing: r.one.listings({
        from: r.listingMedia.listingId,
        to: r.listings.id,
      }),
    },
    listingModerationQueue: {
      listing: r.one.listings({
        from: r.listingModerationQueue.listingId,
        to: r.listings.id,
      }),
      reviewer: r.one.users({
        from: r.listingModerationQueue.reviewerId,
        optional: true,
        to: r.users.id,
      }),
    },
    listingPriceHistory: {
      listing: r.one.listings({
        from: r.listingPriceHistory.listingId,
        to: r.listings.id,
      }),
    },
    listingPromotions: {
      listing: r.one.listings({
        from: r.listingPromotions.listingId,
        to: r.listings.id,
      }),
    },
    listingStatusEvents: {
      actor: r.one.users({
        from: r.listingStatusEvents.actorUserId,
        optional: true,
        to: r.users.id,
      }),
      listing: r.one.listings({
        from: r.listingStatusEvents.listingId,
        to: r.listings.id,
      }),
    },
    listings: {
      amenities: r.many.amenities({
        from: r.listings.id.through(r.listingAmenities.listingId),
        to: r.amenities.id.through(r.listingAmenities.amenityId),
      }),
      building: r.one.buildings({
        from: r.listings.buildingId,
        optional: true,
        to: r.buildings.id,
      }),
      city: r.one.cities({
        from: r.listings.cityId,
        optional: true,
        to: r.cities.id,
      }),
      community: r.one.communities({
        from: r.listings.communityId,
        optional: true,
        to: r.communities.id,
      }),
      country: r.one.countries({
        from: r.listings.countryId,
        to: r.countries.id,
      }),
      division: r.one.adminDivisions({
        from: r.listings.divisionId,
        optional: true,
        to: r.adminDivisions.id,
      }),
      leads: r.many.leads(),
      listedBy: r.one.users({
        alias: 'listing_agent',
        from: r.listings.listedByUserId,
        to: r.users.id,
      }),
      media: r.many.listingMedia(),
      organization: r.one.organizations({
        from: r.listings.orgId,
        to: r.organizations.id,
      }),
      priceHistory: r.many.listingPriceHistory(),
      project: r.one.projects({
        from: r.listings.projectId,
        optional: true,
        to: r.projects.id,
      }),
      promotions: r.many.listingPromotions(),
      statusEvents: r.many.listingStatusEvents(),
      subCommunity: r.one.subCommunities({
        from: r.listings.subCommunityId,
        optional: true,
        to: r.subCommunities.id,
      }),
      translations: r.many.listingTranslations(),
      type: r.one.listingTypes({
        from: r.listings.typeId,
        to: r.listingTypes.id,
      }),
      unit: r.one.units({
        from: r.listings.unitId,
        optional: true,
        to: r.units.id,
      }),
    },
    listingTranslations: {
      listing: r.one.listings({
        from: r.listingTranslations.listingId,
        to: r.listings.id,
      }),
    },
    listingTypes: {
      listings: r.many.listings(),
    },
    organizations: {
      agentProfiles: r.many.agentProfiles(),
      city: r.one.cities({
        from: r.organizations.cityId,
        optional: true,
        to: r.cities.id,
      }),
      country: r.one.countries({
        alias: 'org_hq_country',
        from: r.organizations.countryId,
        optional: true,
        to: r.countries.id,
      }),
      creditWallet: r.one.creditWallets({
        from: r.organizations.id,
        optional: true,
        to: r.creditWallets.orgId,
      }),
      developedBuildings: r.many.buildings(),
      licenseCountry: r.one.countries({
        alias: 'org_license_country',
        from: r.organizations.licenseCountryId,
        optional: true,
        to: r.countries.id,
      }),
      listings: r.many.listings(),
      members: r.many.orgMembers(),
      projects: r.many.projects(),
      subscriptions: r.many.orgSubscriptions(),
    },
    orgMembers: {
      organization: r.one.organizations({
        from: r.orgMembers.orgId,
        to: r.organizations.id,
      }),
      user: r.one.users({
        from: r.orgMembers.userId,
        to: r.users.id,
      }),
    },
    orgSubscriptions: {
      organization: r.one.organizations({
        from: r.orgSubscriptions.orgId,
        to: r.organizations.id,
      }),
      plan: r.one.subscriptionPlans({
        from: r.orgSubscriptions.planId,
        to: r.subscriptionPlans.id,
      }),
    },
    projects: {
      city: r.one.cities({
        from: r.projects.cityId,
        optional: true,
        to: r.cities.id,
      }),
      community: r.one.communities({
        from: r.projects.communityId,
        optional: true,
        to: r.communities.id,
      }),
      country: r.one.countries({
        from: r.projects.countryId,
        to: r.countries.id,
      }),
      developer: r.one.organizations({
        from: r.projects.developerOrgId,
        to: r.organizations.id,
      }),
      listings: r.many.listings(),
      unitTypes: r.many.projectUnitTypes(),
    },
    projectUnitTypes: {
      project: r.one.projects({
        from: r.projectUnitTypes.projectId,
        to: r.projects.id,
      }),
    },
    recentlyViewed: {
      listing: r.one.listings({
        from: r.recentlyViewed.listingId,
        to: r.listings.id,
      }),
      user: r.one.users({
        from: r.recentlyViewed.userId,
        to: r.users.id,
      }),
    },
    savedListings: {
      listing: r.one.listings({
        from: r.savedListings.listingId,
        to: r.listings.id,
      }),
      user: r.one.users({
        from: r.savedListings.userId,
        to: r.users.id,
      }),
    },
    savedSearches: {
      user: r.one.users({
        from: r.savedSearches.userId,
        to: r.users.id,
      }),
    },
    subCommunities: {
      buildings: r.many.buildings(),
      community: r.one.communities({
        from: r.subCommunities.communityId,
        to: r.communities.id,
      }),
      listings: r.many.listings(),
    },
    subscriptionPlans: {
      subscriptions: r.many.orgSubscriptions(),
    },
    units: {
      building: r.one.buildings({
        from: r.units.buildingId,
        to: r.buildings.id,
      }),
      listings: r.many.listings(),
    },
    users: {
      agentProfile: r.one.agentProfiles({
        from: r.users.id,
        optional: true,
        to: r.agentProfiles.userId,
      }),
      compareSets: r.many.compareSets(),
      memberships: r.many.orgMembers(),
      savedListings: r.many.savedListings(),
      savedSearches: r.many.savedSearches(),
    },
    viewings: {
      lead: r.one.leads({
        from: r.viewings.leadId,
        to: r.leads.id,
      }),
      listing: r.one.listings({
        from: r.viewings.listingId,
        to: r.listings.id,
      }),
    },
  })
)
