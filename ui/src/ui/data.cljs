(ns ui.data
  (:require [cognitect.transit :as transit]))

(def r (transit/reader :json))

(def data { :given-name "Greg "
            :family-name "Stewart"
            :title "Chief Technology Officer"
            :home-email "gregs@tcias.co.uk"
            :home-mailto "mailto:gregs+personal-website@tcias.co.uk?subject=Hello from the web"
            :work-email "greg.stewart@red-badger.com"
            :work-mailto "mailto:greg.stewart+personal-website@red-badger.com?subject=Hello from the web"
            :work-number "+44 208 2869246"
            :mobile-number "+44 7891 032239"
            :skype-number "skype:greg.stewart.work?call"})

(defn get-data
  "returns the data"
  [json]
  (conj (transit/read r json) data))
