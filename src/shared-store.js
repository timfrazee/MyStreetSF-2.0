'use strict'

// shared event bus for cross-component communication
// see https://alligator.io/vuejs/global-event-bus/
import Vue from 'vue'
export const EventBus = new Vue()
export const EVENT = {
  MAP_HOVER_FEATURE: 'map-hover-feature',
  MAP_RESIZE: 'map-force-resize-animation',
  MAP_TOGGLE_LAYER: 'map-toggle-layer',
  MAP_SHOW_DISTRICT_OVERLAY: 'map-show-district-overlay',
  UPDATE_FILTERS: 'map-update-filters',
  CLICKED_ADDRESS: 'clicked-address',
  CLICKED_ON_FEATURE: 'clicked-on-feature',
  REMOVE_ADDRESS_MARKER: 'remove-address-marker',
}

let defaultPanelTitle = 'Select any project<br/>to learn more about it.'
let _projectsByTag = {}
let _tagList = []

let _extraLayers = {
  'layer-sup-districts': {
    name: 'Supervisorial District Boundaries',
    geojson: 'https://api.sfcta.org/api/sup_district_boundaries',
  },
}

// Shared common state storage. state object should ONLY be read.
// Use methods to modify state.
export const BigStore = {
  debug: true,
  state: {
    layers: {},
    prjCache: {},
    addressSearchResults: [],
    devDistrictOption: true,
    extraLayers: _extraLayers,
    filterAreas: false,
    filterComplete: false,
    filterDistrict: -1,
    filterStreets: false,
    filterTags: new Set(),
    filterTransit: false,
    filterUnderway: false,
    filterFund: null,
    fundSources: [],
    hoverPanelHide: false,
    hoverPanelText: '',
    infoTitle: defaultPanelTitle,
    infoDetails: '',
    infoUrl: '',
    mainComponent: 'MyMap',
    selectedTags: '',
    showHelp: false,
    showingLayerPanel: false,
    showingMainPanel: true,
    filterKey: 0,
    isPanelHidden: false,
    terms: '',
    results: [],
    tagresults: [],
    tags: _tagList,
  },

  addCacheItem(key, value) {
    // if (this.debug) console.log('addCache triggered:', key)
    this.state.prjCache[key] = value
  },

  addLayer(key, value) {
    // if (this.debug) console.log('addLayer triggered:', key)
    this.state.layers[key] = value
  },

  sendLayerBack(layer) {
    if (this.debug) console.log('sendLayerBack triggered:')
    this.state.layers[layer].bringToBack()
  },
}

if (BigStore.debug) console.log('BigStore initialized')
