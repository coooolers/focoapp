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
    const wset3Set = new Set([
      C.IAP_EARLY_ADOPTER, C.IAP_FULL_ACCESS,
      C.IAP_PROFESSIONAL_2, C.IAP_PROFESSIONAL_3
    ])

    // TODO remove after review!
    if (RemoteConfig.inReview == false) {
      wset3Set.add(C.IAP_PROFESSIONAL_5)
    }

    // TODO remove after review!
    const wset3Set_2 = new Set([
      C.IAP_PROFESSIONAL_5, C.IAP_PROFESSIONAL_2
    ])

    const wset2Set = new Set([
      C.IAP_PROFESSIONAL_2
    ])

    let hasAccess = false
    switch (accessType) {
      case C.ACCESS_FULL:
      case C.ACCESS_PREMIUM_COLLECTION:
      case C.ACCESS_PREMIUM_FLASHCARD:
        purchases.map(purchase => {
          if (wset3Set.has(purchase)) {
            hasAccess = true
          }
        })
        break

      case C.ACCESS_PREMIUM_COLLECTION_2:
      // TODO remove after review!
        let set = wset3Set_2
        if (RemoteConfig.inReview == false) {
          set = wset3Set
        }
        purchases.map(purchase => {
          if (set.has(purchase)) {
            hasAccess = true
          }
        })
        break

      case C.ACCESS_PREMIUM_COLLECTION_WSET2:
        purchases.map(purchase => {
          if (wset2Set.has(purchase)) {
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
    // --- SIMULATOR ONLY ---
    CurrentUser.addPurchase({
      productId,
      transaction: {},
      onComplete: () => onSuccess('dev success')
    })
    // --- SIMULATOR ONLY ---

    // const purchases = new Set(CurrentUser.purchases)
    // if (purchases.has(productId)) {
    //   onSuccess()
    // }
    //
    // Store.purchaseProduct({
    //   productId,
    //   onSuccess: (transaction, message) => {
    //     CurrentUser.addPurchase({
    //       productId,
    //       transaction,
    //       onComplete: () => onSuccess(message)
    //     })
    //   },
    //   onCancel,
    //   onError
    // })
  },

  // returns the preferred product identifier available to the user for a given access type
  preferredProductForType: (accessType = null) => {
    switch (accessType) {
      case C.ACCESS_PREMIUM_COLLECTION:
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
  },

  fetchProducts: ({products, onSuccess, onError}) => {
    return Store.loadProducts({
      products, onSuccess, onError
    })
  },
}

Object.freeze(AccessManager)
export default AccessManager
