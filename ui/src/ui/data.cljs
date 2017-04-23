(ns ui.data
  (:require [cognitect.transit :as transit]))

(def r (transit/reader :json))

(defn get-data
  "returns the data"
  [json]
  (transit/read r json))
