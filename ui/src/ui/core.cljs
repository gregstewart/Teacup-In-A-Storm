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
      [feed-renderer "delicious" "5 most recent bookmarks" (:delicious-items @app-state)]]])

(defn wordpress
  []
  [:div.six.columns.isotope
    [:div.boxee {:data-category "wordpress"}
      [masthead-component "W" "https://www.tcias.co.uk/blog" 6 "Click to view my blog" "icon-wordpress"]
      [feed-renderer "wordpress" "10 most recent posts" (:wordpress-items @app-state)]]])

(defn vimeo
  []
  [:div.six.columns.omega.isotope
    [:div.boxee {:data-category "vimeo"}
      [masthead-component "V" "https://vimeo.com/user2724002/videos" 7 "Click to view my Vimeo profile" "icon-vimeo-sign"]
      [feed-renderer "vimeo" "Recent videos" (:vimeo-items @app-state) "images"]]])

(defn twitter-foursquare-stack
  []
  [:div.six.columns.alpha.isotope
    [:div.boxee.stacked {:data-category "twitter"}
      [masthead-component "T" "https://twitter.com/_greg_stewart_" 8 "Click to view my Twitter profile" "icon-twitter"]
      [feed-renderer "twitter" "Recent tweets" (:twitter-items @app-state)]]
    [:div.boxee.stacked {:data-category "foursquare"}
      [masthead-component "F" "https://foursquare.com/user/13278548" 9 "Click to view my Foursquare profile" "icon-foursquare"]
      [feed-renderer "twitter" "Recent checkins" (:foursquare-items @app-state) "map-list"]]])

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
      [feed-renderer "instagram" "6 most recent images" (:instagram-items @app-state) "images"]]
    [last-fm]
    [flickr]])

(defn github-stackoverflow-google-plus
  []
  [:div.four.columns.omega.isotope
    [:div.boxee.stacked {:data-category "github"}
      [masthead-component "H" "https://github.com/gregstewart" 13 "Click to view my GitHub profile" "icon-github"]
      [feed-renderer "github" "5 most recent events" (:github-items @app-state)]]
    [stackoverflow]
    [google-plus]])

(defn layout []
  [:section.default
    [:div.row.clearfix
      [logo]
      [contact-panel-renderer @app-state]
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
