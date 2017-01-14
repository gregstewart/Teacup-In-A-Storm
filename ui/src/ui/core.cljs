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
                              :skype-number "skype:greg.stewart.work?call"
                              :delicious-items {
                                                :type "delicious"
                                                :items [{:link "https://shop.icio.us/sales/the-limited-edition-black-hawk-drone-hd-camera?utm_source=del.icio.us&utm_medium=referral&utm_campaign=the-limited-edition-black-hawk-drone-hd-camera"
                                                          :value "Sponsored: 64% off Code Black Drone with HD Camera"}
                                                        {:link "http://del.icio.us/url/6de4592a88abc522a5084e393bd69bcf#wildcard1999"
                                                          :value "Senior Engineers Reduce Risk — Medium"}
                                                        {:link "http://del.icio.us/url/fed7763a752426445c4b25aaae822062#wildcard1999"
                                                          :value "api-guidelines/Guidelines.md at master · Microsoft/api-guidelines"}
                                                        {:link "http://del.icio.us/url/95e802bba6282c5aa3826ef30ea4fa01#wildcard1999"
                                                          :value "nervous-systems/cljs-lambda: Utilities around deploying Clojurescript functions to AWS Lambda"}
                                                        {:link "http://del.icio.us/url/5e559a3d88ab8fa5079b59161f802609#wildcard1999"
                                                          :value "Clojurescript & Node on AWS Lambda – Nervous Systems"}]}}))

(defn lister
  [items-structure]
  (def style (get items-structure :type))
  (def items (get items-structure :items))
  [:ul
    (for [item items]
        ^{:key item} [:li {:className style}
                        [:a {:href (get item :link)}
                          (get item :value)]])])

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
  [:div.eight.columns
    [:div.boxee
      [:div.lhs.vcard
        [:div.name {:lang "en"}
          (display-name)
          (display-title)]
        (email)
        (phone-details)
        (address-details)]]])

(defn logo []
  [:div.four.columns.alpha
    [:div.boxee
      [:img {:src "assets/logo.png"}]]])

(defn linked-in []
  [:div.four.columns.omega
    [:div.boxee
      [:a.url.icon {:accessKey "L"
                    :href "http://www.linkedin.com/in/gregstewart"
                    :tabIndex "3"
                    :title "Click to view my LinkedIn profile"}

            [:i {:class "icon-linkedin-sign"}]]]])

(defn delicious
  []
  [:div.four.columns.alpha.isotope
    [:div.boxee {:data-category "delicious"}
      [:a.url.icon {:accessKey "D"
                    :href "https://delicious.com/wildcard1999"
                    :tabIndex "5"
                    :title "Click to view my Delicious profile"}

          [:i {:class "icon-delicious "}]]
      [:div.feed
        [:h3.delicious "5 most recent bookmarks"]
        [lister (:delicious-items @app-state)]]]])



(defn layout []
  [:section.default
    [:div.row.clearfix
      [logo]
      [contact-panel]
      [linked-in]]
    [:div.row.clearfix
      [delicious]]])

(reagent/render-component [layout];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
