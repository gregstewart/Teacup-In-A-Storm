(ns ui.core
  (:require [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(def app-state (reagent/atom { :given-name "Greg "
                              :family-name "Stewart"
                              :title "Consultant/Developer"
                              :email "gregs@tcias.co.uk"
                              :mailto "mailto:gregs@tcias.co.uk?subject=Hello from the web"
                              :work-number "+44 208 2869246"
                              :mobile-number "+44 7891 032239"
                              :skype-number "skype:greg.stewart.work?call"}))

(defn display-name []
  [:h2.fn.n
    [:span.given-name (:given-name @app-state)]
    [:span.family-name (:family-name @app-state)]])

(defn email []
  [:dl.info
    [:dt.email
      [:abbr.type {:title "email"} "Email"]]
    [:dd
      [:i.icon-envelope
        [:a {:href (:mailto @app-state) :title "Click to email me"} (:email @app-state)]]]])

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
                  :accesskey "S"
                  :tabindex "4"} "Skype me"]]]])

(defn address-details []
  [:div.address
    [:i.icon-home]
    [:span {:lang "en" :xml-lang "en"}
      [:span.street-address "547 Kingston Road "]
      [:span.locality "Raynes Park "]
      [:span.region "London "]
      [:span.postcal-code "SW20 8SF "]]])

(defn contact-panel []
  [:div
    [:div.name {:lang "en"}
      (display-name)
      [:h2.title (:title @app-state)]]
    (email)
    (phone-details)
    (address-details)])




(reagent/render-component [contact-panel];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
