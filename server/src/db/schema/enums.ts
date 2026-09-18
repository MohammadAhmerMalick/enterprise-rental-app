import { pgEnum } from 'drizzle-orm/pg-core'

export const areaUnitEnum = pgEnum('area_unit', ['sqm', 'sqft'])

export const completionStatusEnum = pgEnum('completion_status', [
  'ready',
  'off_plan',
])

export const creditTransactionTypeEnum = pgEnum('credit_transaction_type', [
  'grant',
  'purchase',
  'refresh',
  'featured',
  'spotlight',
  'refund',
  'adjustment',
])

export const furnishingEnum = pgEnum('furnishing', [
  'unfurnished',
  'semi',
  'furnished',
])

export const geoAliasTargetEnum = pgEnum('geo_alias_target', [
  'country',
  'admin_division',
  'city',
  'community',
  'sub_community',
  'building',
])

export const leadChannelEnum = pgEnum('lead_channel', [
  'form',
  'call',
  'whatsapp',
  'email',
  'chat',
])

export const leadStatusEnum = pgEnum('lead_status', [
  'new',
  'contacted',
  'qualified',
  'viewing_set',
  'won',
  'lost',
  'spam',
])

export const listingCategoryEnum = pgEnum('listing_category', [
  'residential',
  'commercial',
  'land',
])

export const listingPurposeEnum = pgEnum('listing_purpose', ['sale', 'rent'])

export const listingQualityEnum = pgEnum('listing_quality', [
  'standard',
  'featured',
  'premium',
  'spotlight',
])

export const listingStatusEnum = pgEnum('listing_status', [
  'draft',
  'pending_review',
  'live',
  'reserved',
  'under_offer',
  'sold',
  'rented',
  'expired',
  'rejected',
  'archived',
])

export const measurementSystemEnum = pgEnum('measurement_system', [
  'metric',
  'imperial',
])

export const mediaKindEnum = pgEnum('media_kind', [
  'photo',
  'floor_plan',
  'video',
  'tour_360',
  'brochure',
])

export const moderationDecisionEnum = pgEnum('moderation_decision', [
  'approved',
  'rejected',
])

export const notifyViaEnum = pgEnum('notify_via', ['email', 'push', 'none'])

export const occupancyEnum = pgEnum('occupancy', [
  'vacant',
  'occupied',
  'tenanted',
])

export const orgMemberRoleEnum = pgEnum('org_member_role', [
  'owner',
  'manager',
  'agent',
  'viewer',
])

export const orgMemberStatusEnum = pgEnum('org_member_status', [
  'invited',
  'active',
  'disabled',
])

export const orgStatusEnum = pgEnum('org_status', [
  'active',
  'paused',
  'banned',
])

export const orgSubscriptionStatusEnum = pgEnum('org_subscription_status', [
  'trialing',
  'active',
  'past_due',
  'canceled',
])

export const orgTypeEnum = pgEnum('org_type', [
  'agency',
  'developer',
  'bank',
  'platform',
])

export const platformRoleEnum = pgEnum('platform_role', ['user', 'admin'])

export const pricePeriodEnum = pgEnum('price_period', [
  'sale',
  'yearly',
  'monthly',
  'weekly',
  'daily',
])

export const projectStatusEnum = pgEnum('project_status', [
  'announced',
  'launching',
  'under_construction',
  'handover',
  'completed',
])

export const promotionKindEnum = pgEnum('promotion_kind', [
  'refresh',
  'featured',
  'spotlight',
])

export const reviewModerationEnum = pgEnum('review_moderation', [
  'pending',
  'approved',
  'rejected',
])

export const subscriptionIntervalEnum = pgEnum('subscription_interval', [
  'monthly',
  'yearly',
])

export const userStatusEnum = pgEnum('user_status', [
  'active',
  'suspended',
  'deleted',
])

export const verificationStatusEnum = pgEnum('verification_status', [
  'unverified',
  'pending',
  'verified',
  'rejected',
])

export const viewingStatusEnum = pgEnum('viewing_status', [
  'requested',
  'confirmed',
  'completed',
  'no_show',
  'cancelled',
])
