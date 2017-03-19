(ns ui.core
  (:require [reagent.core :as reagent :refer [atom]]
            [ui.data :as ui-data :refer [data]]
            [ui.components.lists :as lists :refer [list-renderer]]
            [ui.components.masthead :as masthead :refer [masthead-component]]
            [ui.components.contact-panel :as contact-panel :refer [contact-panel-renderer]]))

(enable-console-print!)

(def app-state (reagent/atom data))

(defn feed-renderer
  [class title list-data list-style]
  [:div.feed
    [:h3 {:className class} title]
    [list-renderer list-data list-style]])

(defn logo
  []
  [:div.boxee
    [:img {:src "assets/logo.png"}]])

(defn linked-in
  []
  [:div.boxee
    [masthead-component "L" "http://www.linkedin.com/in/gregstewart" 3 "Click to view my LinkedIn profile" "icon-linkedin-sign"]])

(defn delicious
  []
  [:div.boxee {:data-category "delicious"}
    [masthead-component "D" "https://delicious.com/wildcard1999" 5 "Click to view my Delicious profile" "icon-delicious"]
    [feed-renderer "delicious" "5 most recent bookmarks" (:delicious-items @app-state)]])

(defn wordpress
  []
  [:div.boxee {:data-category "wordpress"}
    [masthead-component "W" "https://www.tcias.co.uk/blog" 6 "Click to view my blog" "icon-wordpress"]
    [feed-renderer "wordpress" "10 most recent posts" (:wordpress-items @app-state)]])

(defn vimeo
  []
  [:div.boxee {:data-category "vimeo"}
    [masthead-component "V" "https://vimeo.com/user2724002/videos" 7 "Click to view my Vimeo profile" "icon-vimeo-sign"]
    [feed-renderer "vimeo" "Recent videos" (:vimeo-items @app-state) "images"]])

(defn twitter
  []
  [:div.boxee.stacked {:data-category "twitter"}
    [masthead-component "T" "https://twitter.com/_greg_stewart_" 8 "Click to view my Twitter profile" "icon-twitter"]
    [feed-renderer "twitter" "Recent tweets" (:twitter-items @app-state)]])

((defn foursquare
  []
  [:div.boxee.stacked {:data-category "foursquare"}
    [masthead-component "F" "https://foursquare.com/user/13278548" 9 "Click to view my Foursquare profile" "icon-foursquare"]
    [feed-renderer "twitter" "Recent checkins" (:foursquare-items @app-state) "map-list"]]))

(defn instagram
  []
  [:div.boxee.stacked {:data-category "instagram"}
    [masthead-component "I" "http://instagram.com/_greg_stewart_" 10 "Click to view my Instagram profile" "icon-instagram"]
    [feed-renderer "instagram" "6 most recent images" (:instagram-items @app-state) "images"]])

(defn last-fm
  []
  [:div.boxee.stacked {:data-category "last-fm"}
    [masthead-component "L" "http://www.last.fm/user/greg_stewart" 11 "Click to view my Last.fm profile" "icon-lastfm-sign"]])

(defn flickr
  []
  [:div.boxee.stacked {:data-category "flickr"}
    [masthead-component "R" "http://www.flickr.com/photos/greg_and_jodie/" 12 "Click to view my Flickr profile" "icon-flickr-sign"]])

(defn github
  []
  [:div.boxee.stacked {:data-category "github"}
    [masthead-component "H" "https://github.com/gregstewart" 13 "Click to view my GitHub profile" "icon-github"]
    [feed-renderer "github" "5 most recent events" (:github-items @app-state)]])

(defn stackoverflow
  []
  [:div.boxee.stacked {:data-category "stackover-flow"}
    [masthead-component "O" "http://stackoverflow.com/users/197825/greg-stewart" 14 "Click to view my Stackoverflow profile" "icon-stack-overflow"]])

(defn google-plus
  []
  [:div.boxee.stacked {:data-category "google-plus"}
    [masthead-component "G" "https://plus.google.com/110643069434566075441" 15 "Click to view my Google+ profile" "icon-google-plus"]])

(defn layout []
  [:section.default
    [:div.row.clearfix
      [:div.four.columns.alpha
        [logo]]
      [:div.eight.columns
        [contact-panel-renderer @app-state]]
      [:div.four.columns.omega
        [linked-in]]]
    [:div.row.clearfix
      [:div.four.columns.alpha.isotope
        [delicious]]
      [:div.six.columns.isotope
        [wordpress]]
      [:div.six.columns.omega.isotope
        [vimeo]]]
    [:div.row.clearfix
      [:div.six.columns.alpha.isotope
        [twitter]
        [foursquare]]
      [:div.six.columns.isotope
        [instagram]
        [last-fm]
        [flickr]]
      [:div.four.columns.omega.isotope
        [github]
        [stackoverflow]
        [google-plus]]]])

(reagent/render-component [layout];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
