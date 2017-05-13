(ns ui.components.lists)

(defn date-component
  [date]
  [:div
    date])

(defn standard-list-component
  [item style]
  ^{:key item} [:li {:className style}
                  [:a {:href (get item "link")}
                    (get item "value")]
                  (date-component (get item "date"))])

(defn image-list-component
  [item style]
  ^{:key item} [:li {:className style}
                [:div
                  [:a {:href (get item "link")}
                    [:img.vimeo.inset-shadow {:src (get item "image") :title (get item "value")}]]
                  [:br]
                  (get item "value")]])

(defn map-list-component
  [item style]
  ^{:key item} [:li {:className style}
                  [:div.map.leaflet-container.leaflet-fade-anim
                    {:data-lat (get item "lat")
                      :data-lon (get item "lon")}]
                  [:a
                    (get item "value")]
                  (date-component (get item "date"))])


(defn list-renderer
  [items-structure top-level-style type]
  (println items-structure)
  (def items (get items-structure "items"))
  [:ul {:className (or top-level-style :default)}
    (for [item items]
      (cond
        (= top-level-style "images") (image-list-component item type)
        (= top-level-style "map-list") (map-list-component item type)
        :else (standard-list-component item type)))])
