(ns ui.core
  (:require [reagent.core :as reagent :refer [atom]]
            [ui.data :as ui-data :refer [data]]
            [ui.components.lists :as lists :refer [list-renderer]]
            [ui.components.masthead :as masthead :refer [masthead-component]]
            [ui.components.contact-panel :as contact-panel :refer [contact-panel-renderer]]))

(enable-console-print!)

(def app-state (reagent/atom data))

(defn feed-renderer
  "Returns a feed component based of the data and styling"
  [class title list-data list-style]
  [:div.feed
    [:h3 {:className class} title]
    [list-renderer list-data list-style]])

(defn logo
  []
  [:div.boxee
    [:img {:src "assets/logo.png"}]])

(defn box
  "Returns a boxee component taking the following values as a vector: class-names, category, masthead and optional feed component. Actually feels like it should be able to just take any old component"
  [classNames category masthead & feed]
  [:div {:class classNames :data-category category}
    masthead
    feed])

(defn layout []
  [:section.default
    [:div.row.clearfix
      [:div.four.columns.alpha
        [logo]]
      [:div.eight.columns
        (contact-panel-renderer @app-state)]
      [:div.four.columns.omega
        (box "boxee" "linked-in" (masthead-component ["L" "http://www.linkedin.com/in/gregstewart" 3 "Click to view my LinkedIn profile" "icon-linkedin-sign"]))]]
    [:div.row.clearfix
      [:div.four.columns.alpha.isotope
        (box "boxee"
            :delicious
            (masthead-component ["D" "https://delicious.com/wildcard1999" 5 "Click to view my Delicious profile" "icon-delicious"])
            [feed-renderer :delicious "5 most recent bookmarks" (get-in @app-state [:delicious :list-items])])]
      [:div.six.columns.isotope
        (box "boxee"
            :wordpress
            (masthead-component ["W" "https://www.tcias.co.uk/blog" 6 "Click to view my blog" "icon-wordpress"])
            [feed-renderer :wordpress "10 most recent posts" (get-in @app-state [:wordpress :list-items])])]
      [:div.six.columns.omega.isotope
        (box "boxee"
            :vimeo
            (masthead-component ["V" "https://vimeo.com/user2724002/videos" 7 "Click to view my Vimeo profile" "icon-vimeo-sign"])
            [feed-renderer :vimeo "Recent videos" (get-in @app-state [:vimeo :list-items]) "images"])]]
    [:div.row.clearfix
      [:div.six.columns.alpha.isotope
        (box "boxee stacked"
            :twitter
            (masthead-component ["T" "https://twitter.com/_greg_stewart_" 8 "Click to view my Twitter profile" "icon-twitter"])
            [feed-renderer :twitter "Recent tweets" (get-in @app-state [:twitter :list-items])])
        (box "boxee stacked"
            :foursquare
            (masthead-component ["F" "https://foursquare.com/user/13278548" 9 "Click to view my Foursquare profile" "icon-foursquare"])
            [feed-renderer :foursquare "Recent checkins" (get-in @app-state [:foursquare :list-items]) "map-list"])]
      [:div.six.columns.isotope
        (box "boxee stacked"
            :instagram
            (masthead-component ["I" "http://instagram.com/_greg_stewart_" 10 "Click to view my Instagram profile" "icon-instagram"])
            [feed-renderer :instagram "6 most recent images" (get-in @app-state [:instagram :list-items]) "images"])
        (box "boxee stacked" "last-fm" (masthead-component ["L" "http://www.last.fm/user/greg_stewart" 11 "Click to view my Last.fm profile" "icon-lastfm-sign"]))
        (box "boxee stacked" "flickr" (masthead-component ["R" "http://www.flickr.com/photos/greg_and_jodie/" 12 "Click to view my Flickr profile" "icon-flickr-sign"]))]
      [:div.four.columns.omega.isotope
        (box "boxee stacked"
            :github
            (masthead-component ["H" "https://github.com/gregstewart" 13 "Click to view my GitHub profile" "icon-github"])
            [feed-renderer :github "5 most recent events" (get-in @app-state [:github :list-items])])
        (box "boxee stacked" "stackover-flow" (masthead-component ["O" "http://stackoverflow.com/users/197825/greg-stewart" 14 "Click to view my Stackoverflow profile" "icon-stack-overflow"]))
        (box "boxee stacked" "google-plus" (masthead-component ["G" "https://plus.google.com/110643069434566075441" 15 "Click to view my Google+ profile" "icon-google-plus"]))]]])

(reagent/render-component [layout];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
