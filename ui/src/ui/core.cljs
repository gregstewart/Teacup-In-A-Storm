(ns ui.core
  (:require [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)

(def app-state (reagent/atom { :given-name "Greg "
                              :family-name "Stewart"
                              :title "Chief Technology Officer"
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
                                                          :value "Clojurescript & Node on AWS Lambda – Nervous Systems"}]}
                              :wordpress-items {
                                                :type "wordpress"
                                                :items [{:link "https://www.tcias.co.uk/blog/2015/08/07/your-organisation-should-adopt-an-open-source-model"
                                                          :value "Your Organisation Should Adopt an Open Source Model"}
                                                        {:link "https://www.tcias.co.uk/blog/2015/06/28/why-use-node-dot-js"
                                                          :value "Why Use Node.js"}]}
                              :vimeo-items {
                                                :type "vimeo"
                                                :items [{:link "https://vimeo.com/93167466"
                                                          :value "Portland vs Houston - drummers"
                                                          :image "https://i.vimeocdn.com/video/473143901_640.jpg"}
                                                        {:link "https://vimeo.com/93167206"
                                                          :value "Portland vs Houston - opening"
                                                          :image "https://i.vimeocdn.com/video/473143582_640.jpg"}]}
                              :twitter-items {
                                                :type "twitter"
                                                :items [{:link "https://twitter.com/_greg_stewart_/status/761244885571821568"
                                                          :value "RT @KentBeck: Paint drip people, a successor to T-shaped people: https://t.co/Sm1cNOZYfV"
                                                          :date " - 2016/08/04 @ 16:58"}
                                                        {:link "https://twitter.com/_greg_stewart_/status/761242585612574721"
                                                          :value "RT @redbadgerteam: Interested in joining our BRILLIANT team? We are hiring! Check out our vacancies here- https://t.co/OXah9qF7xe #jobs htt…"
                                                          :date " - 2016/08/04 @ 16:49"}]}
                              :foursquare-items {
                                                  :type "foursquare"
                                                  :items [{:lat "51.50746113725417"
                                                            :lon "-0.0963776918662706"
                                                            :value "Porky's"
                                                            :date " - 2016/08/19 @ 17:43"}
                                                          {:lat "51.505386536427"
                                                            :lon "-0.09778078814608747"
                                                            :value "Itsu"
                                                            :date " - 2016/08/19 @ 12:08"}]}

                              :instagram-items {
                                                :type "instagram"
                                                :items [{:link "https://www.instagram.com/p/BJMrkkDhgFE/"
                                                          :image "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13703165_486634748282966_1570166956_n.jpg?ig_cache_key=MTMxODYyMDQxOTUyNzY3MjEzMg%3D%3D.2"}
                                                        {:link "https://www.instagram.com/p/BJDBPllh0lQ/"
                                                          :image "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13687050_1212816692061982_1717695137_n.jpg?ig_cache_key=MTMxNTkwMDk4NTMxOTA0OTU1Mg%3D%3D.2"}]}
                              :github-items {
                                                :type "github"
                                                :items [{:link "https://api.github.com/repos/gregstewart/hearthstone-tracker"
                                                          :value "CreateEvent gregstewart/hearthstone-tracker"
                                                          :date " - 2016/08/19 @ 19:32"}
                                                        {:link "https://api.github.com/repos/gregstewart/hearthstone-tracker"
                                                          :value "CreateEvent gregstewart/hearthstone-tracker"
                                                          :date " - 2016/08/19 @ 19:18"}]}}))

(defn standard-list-component
  [item style]
  ^{:key item} [:li {:className style}
                  [:a {:href (get item :link)}
                    (get item :value)]
                  (get item :date)])

(defn image-list-component
  [item style]
  ^{:key item} [:li {:className style}
                [:div
                  [:a {:href (get item :link)}
                    [:img.vimeo.inset-shadow {:src (get item :image) :title (get item :value)}]]
                  [:br]
                  (get item :value)]])

(defn map-list-component
  [item style]
  ^{:key item} [:li {:className style}
                  [:div.map.leaflet-container.leaflet-fade-anim
                    {:data-lat (get item :lat)
                      :data-lon (get item :lon)}]
                  [:a
                    (get item :value)]
                  (get item :date)])

(defn lister
  [items-structure top-level-style]
  (def style (get items-structure :type))
  (def items (get items-structure :items))
  [:ul {:className (or top-level-style :default)}
    (for [item items]
      (cond
        (= top-level-style "images") (image-list-component item style)
        (= top-level-style "map-list") (map-list-component item style)
        :else (standard-list-component item style)))])

(defn masthead-component
  [access-key link tab-index title icon]
  [:a.url.icon {:accessKey access-key
                :href link
                :tabIndex tab-index
                :title title}

        [:i {:class icon}]])

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
      [masthead-component "L" "http://www.linkedin.com/in/gregstewart" 3 "Click to view my LinkedIn profile" "icon-linkedin-sign"]]])

(defn delicious
  []
  [:div.four.columns.alpha.isotope
    [:div.boxee {:data-category "delicious"}
      [masthead-component "D" "https://delicious.com/wildcard1999" 5 "Click to view my Delicious profile" "icon-delicious"]
      [:div.feed
        [:h3.delicious "5 most recent bookmarks"]
        [lister (:delicious-items @app-state)]]]])

(defn wordpress
  []
  [:div.six.columns.isotope
    [:div.boxee {:data-category "wordpress"}
      [masthead-component "W" "https://www.tcias.co.uk/blog" 6 "Click to view my blog" "icon-wordpress"]
      [:div.feed
        [:h3.wordpress "10 most recent posts"]
        [lister (:wordpress-items @app-state)]]]])

(defn vimeo
  []
  [:div.six.columns.omega.isotope
    [:div.boxee {:data-category "vimeo"}
      [masthead-component "V" "https://vimeo.com/user2724002/videos" 7 "Click to view my Vimeo profile" "icon-vimeo-sign"]
      [:div.feed
        [lister (:vimeo-items @app-state) "images"]]]])

(defn twitter-foursquare-stack
  []
  [:div.six.columns.alpha.isotope
    [:div.boxee.stacked {:data-category "twitter"}
      [masthead-component "T" "https://twitter.com/_greg_stewart_" 8 "Click to view my Twitter profile" "icon-twitter"]
      [:div.feed
        [:h3.twitter "Recent tweets"]
        [lister (:twitter-items @app-state)]]]
    [:div.boxee.stacked {:data-category "foursquare"}
      [masthead-component "F" "https://foursquare.com/user/13278548" 9 "Click to view my Foursquare profile" "icon-foursquare"]
      [:div.feed
        [:h3.foursquare "Recent checkins"]
        [lister (:foursquare-items @app-state) "map-list"]]]])

(defn last-fm []
  [:div.boxee.stacked {:data-category "last-fm"}
    [masthead-component "L" "http://www.last.fm/user/greg_stewart" 11 "Click to view my Last.fm profile" "icon-lastfm-sign"]])

(defn flickr
  []
  [:div.boxee.stacked {:data-category "flickr"}
    [masthead-component "R" "http://www.flickr.com/photos/greg_and_jodie/" 12 "Click to view my Flickr profile" "icon-flickr-sign"]])

(defn stackoverflow
  []
  [:div.boxee.stacked {:data-category "stackover-flow"}
    [masthead-component "O" "http://stackoverflow.com/users/197825/greg-stewart" 14 "Click to view my Stackoverflow profile" "icon-stack-overflow"]])

(defn google-plus
  []
  [:div.boxee.stacked {:data-category "google-plus"}
    [masthead-component "G" "https://plus.google.com/110643069434566075441" 15 "Click to view my Google+ profile" "icon-google-plus"]])

(defn instagram-lastfm-flickr
  []
  [:div.six.columns.isotope
    [:div.boxee.stacked {:data-category "instagram"}
      [masthead-component "I" "http://instagram.com/_greg_stewart_" 10 "Click to view my Instagram profile" "icon-instagram"]
      [:div.feed
        [:h3.instagram "6 most recent images"]
        [lister (:instagram-items @app-state) "images"]]]
    [last-fm]
    [flickr]])

(defn github-stackoverflow-google-plus
  []
  [:div.four.columns.omega.isotope
    [:div.boxee.stacked {:data-category "github"}
      [masthead-component "H" "https://github.com/gregstewart" 13 "Click to view my GitHub profile" "icon-github"]
      [:div.feed
        [:h3.github "5 most recent events"]
        [lister (:github-items @app-state)]]]
    [stackoverflow]
    [google-plus]])

(defn layout []
  [:section.default
    [:div.row.clearfix
      [logo]
      [contact-panel]
      [linked-in]]
    [:div.row.clearfix
      [delicious]
      [wordpress]
      [vimeo]]
    [:div.row.clearfix
      [twitter-foursquare-stack]
      [instagram-lastfm-flickr]
      [github-stackoverflow-google-plus]]])

(reagent/render-component [layout];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
