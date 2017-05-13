(ns ui.components.contact-panel)

(defn display-name [state]
  [:h1.fn.n
    [:span.given-name (:given-name state)]
    [:span.family-name (:family-name state)]])

(defn display-title [state]
  [:h2.title (:title state)])

(defn email [state]
  [:dl.email
    [:dt.home
      [:abbr.type {:title "home"} "Email"]]
    [:dd
      [:i.icon-envelope
        [:a {:href (:home-mailto state) :title "Click to email me"} (:home-email state)]]]
    [:dt.work
      [:abbr.type {:title "work"} "Email"]]
    [:dd
      [:i.icon-envelope
        [:a {:href (:work-mailto state) :title "Click to email me"} (:work-email state)]]]])

(defn phone-details [state]
  [:dl.tel
    [:dt.phone
      [:abbr.type {:title "work"} "Phone"]]
    [:dd
      [:i.icon-phone-sign
        [:span.value (:work-number state)]]]
    [:dt.mobile
          [:abbr.type {:title "cell"} "Mobile"]]
    [:dd
      [:i.icon-phone-sign
        [:span.value (:mobile-number state)]]]
    [:dt.skype
          [:abbr.type {:title "Skype"} "Skype"]]
    [:dd
      [:i.icon-skype
        [:a.url {:href (:skype-number state)
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

(defn contact-panel-renderer
  [state]
  [:div.boxee
    [:div.lhs.vcard
      [:div.name {:lang "en"}
        (display-name state)
        (display-title state)]
      (email state)
      (phone-details state)
      (address-details)]])
