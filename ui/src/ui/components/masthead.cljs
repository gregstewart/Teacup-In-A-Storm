(ns ui.components.masthead)

(defn masthead-component
  "Returns a masthead component taking the following values as a vector: access-key link tab-index title icon"
  [props]
  [:a.url.icon {:accessKey (get props 0)
                :href (get props 1)
                :tabIndex (get props 2)
                :title (get props 3)}

        [:i {:class (get props 4)}]])
