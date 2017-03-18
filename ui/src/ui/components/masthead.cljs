(ns ui.components.masthead)

(defn masthead-component
  [access-key link tab-index title icon]
  [:a.url.icon {:accessKey access-key
                :href link
                :tabIndex tab-index
                :title title}

        [:i {:class icon}]])
