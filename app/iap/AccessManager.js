import C from '../constants'
import RemoteConfig from '../../configureApp'
import CurrentUser from '../auth/CurrentUser'
import Store from './Store'

const AccessManager = {
  // Params:
  // - accessType - string representing access type required - ie. ACCESS_PREMIUM_COLLECTION, ACCESS_CONSUMERABLE_FLASHCARDS
  // - accessKey - key string representing content identifier
  hasAccess: ({accessType = null, accessKey = null}) => {
    const purchases = CurrentUser.purchases || []
    const fullAccessSet = new Set([
      C.IAP_EARLY_ADOPTER, C.IAP_FULL_ACCESS,
      C.IAP_PROFESSIONAL_2, C.IAP_PROFESSIONAL_3,
      C.IAP_PROFESSIONAL_5, C.IAP_PROFESSIONAL_10,
      C.IAP_PROFESSIONAL_15, C.IAP_PROFESSIONAL_20
    ])

    let hasAccess = false

    switch (accessType) {
      case C.ACCESS_FULL:
      case C.ACCESS_PREMIUM_COLLECTION:
      case C.ACCESS_PREMIUM_FLASHCARD:
        purchases.map(purchase => {
          if (fullAccessSet.has(purchase)) {
            hasAccess = true
          }
        })
        break

      case C.ACCESS_CONSUMABLE_COLLECTION:
        hasAccess = true
        break

      case C.ACCESS_CONSUMABLE_FLASHCARD:
        hasAccess = true
        break

      default:
        hasAccess = true
    }

    return hasAccess
  },

  unlockAccess: ({productId, accessType = null, accessKey = null, onSuccess, onCancel, onError}) => {
    const purchases = new Set(CurrentUser.purchases)
    if (purchases.has(productId)) {
      onSuccess()
    }

    Store.purchaseProduct({
      productId,
      onSuccess: (transaction) => {
        CurrentUser.addPurchase({
          productId,
          transaction,
          onComplete: onSuccess
        })
      },
      onCancel,
      onError
    })
  },

  // returns the preferred product identifier available to the user for a given access type
  preferredProductForType: (accessType = null) => {
    switch (accessType) {
      case C.ACCESS_PREMIUM_COLLECTION:
        if (CurrentUser.profile.email == 'reviewers@vpqlabs.com' ||
            CurrentUser.profile.email == 'tester+1@vpqlabs.com') {
          return C.IAP_PROFESSIONAL_2
        }
        // load from Firebase Remote Config
        return RemoteConfig.fullUpgradeProductId
      default:
        return null
    }
  },

  fetchProductDetails: ({productId, onSuccess, onError}) => {
    return Store.loadProduct({
      productId, onSuccess, onError
    })
  }
}

Object.freeze(AccessManager)
export default AccessManager
