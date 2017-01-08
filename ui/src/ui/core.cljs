(ns ui.core
  (:require [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(def app-state (reagent/atom { :given-name "Greg "
                              :family-name "Stewart"
                              :title "Chief Technical Officer"
                              :home-email "gregs@tcias.co.uk"
                              :home-mailto "mailto:gregs+personal-website@tcias.co.uk?subject=Hello from the web"
                              :work-email "greg.stewart@red-badger.com"
                              :work-mailto "mailto:greg.stewart+personal-website@red-badger.com?subject=Hello from the web"
                              :work-number "+44 208 2869246"
                              :mobile-number "+44 7891 032239"
                              :skype-number "skype:greg.stewart.work?call"}))

(defn display-name []
  [:h1.fn.n
    [:span.given-name (:given-name @app-state)]
    [:span.family-name (:family-name @app-state)]])

(defn display-title []
  [:h2.title (:title @app-state)])

(defn email []
  [:dl.email
    [:dt.home
      [:abbr.type {:title "home"} "Email"]]
    [:dd
      [:i.icon-envelope
        [:a {:href (:home-mailto @app-state) :title "Click to email me"} (:home-email @app-state)]]]
    [:dt.work
      [:abbr.type {:title "work"} "Email"]]
    [:dd
      [:i.icon-envelope
        [:a {:href (:work-mailto @app-state) :title "Click to email me"} (:work-email @app-state)]]]])

(defn phone-details []
  [:dl.tel
    [:dt.phone
      [:abbr.type {:title "work"} "Phone"]]
    [:dd
      [:i.icon-phone-sign
        [:span.value (:work-number @app-state)]]]
    [:dt.mobile
          [:abbr.type {:title "cell"} "Mobile"]]
    [:dd
      [:i.icon-phone-sign
        [:span.value (:mobile-number @app-state)]]]
    [:dt.skype
          [:abbr.type {:title "Skype"} "Skype"]]
    [:dd
      [:i.icon-skype
        [:a.url {:href (:skype-number @app-state)
                  :accessKey "S"
                  :tabIndex "4"} "Skype me"]]]])

(defn address-details []
  [:dl.address
    [:dt.home
      [:abbr.type {:title "home"} "Home address"]]
    [:dd
      [:i.icon-home]
      [:span {:lang "en" :xml-lang "en"}
        [:span.street-address "547 Kingston Road "]
        [:span.locality "Raynes Park "]
        [:span.region "London "]
        [:span.postcal-code "SW20 8SF "]]]])

(defn contact-panel []
  [:div
    [:div.name {:lang "en"}
      (display-name)
      (display-title)]
    (email)
    (phone-details)
    (address-details)])

(reagent/render-component [contact-panel];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
