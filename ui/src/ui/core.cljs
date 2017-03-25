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
        (box "boxee" :linked-in (masthead-component (get-in @app-state [:linked-in :details])))]]
    [:div.row.clearfix
      [:div.four.columns.alpha.isotope
        (box "boxee"
            :delicious
            (masthead-component (get-in @app-state [:delicious :details]))
            [feed-renderer :delicious "5 most recent bookmarks" (get-in @app-state [:delicious :list-items])])]
      [:div.six.columns.isotope
        (box "boxee"
            :wordpress
            (masthead-component (get-in @app-state [:wordpress :details]))
            [feed-renderer :wordpress "10 most recent posts" (get-in @app-state [:wordpress :list-items])])]
      [:div.six.columns.omega.isotope
        (box "boxee"
            :vimeo
            (masthead-component (get-in @app-state [:vimeo :details]))
            [feed-renderer :vimeo "Recent videos" (get-in @app-state [:vimeo :list-items]) "images"])]]
    [:div.row.clearfix
      [:div.six.columns.alpha.isotope
        (box "boxee stacked"
            :twitter
            (masthead-component (get-in @app-state [:twitter :details]))
            [feed-renderer :twitter "Recent tweets" (get-in @app-state [:twitter :list-items])])
        (box "boxee stacked"
            :foursquare
            (masthead-component (get-in @app-state [:foursquare :details]))
            [feed-renderer :foursquare "Recent checkins" (get-in @app-state [:foursquare :list-items]) "map-list"])]
      [:div.six.columns.isotope
        (box "boxee stacked"
            :instagram
            (masthead-component (get-in @app-state [:instagram :details]))
            [feed-renderer :instagram "6 most recent images" (get-in @app-state [:instagram :list-items]) "images"])
        (box "boxee stacked" :last-fm (masthead-component (get-in @app-state [:last-fm :details])))
        (box "boxee stacked" :flickr (masthead-component (get-in @app-state [:flickr :details])))]
      [:div.four.columns.omega.isotope
        (box "boxee stacked"
            :github
            (masthead-component (get-in @app-state [:github :details]))
            [feed-renderer :github "5 most recent events" (get-in @app-state [:github :list-items])])
        (box "boxee stacked" :stackover-flow (masthead-component (get-in @app-state [:stackover-flow :details])))
        (box "boxee stacked" :google-plus (masthead-component (get-in @app-state [:google-plus :details])))]]])

(reagent/render-component [layout];
                          (. js/document (getElementById "app")))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc))
