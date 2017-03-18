(ns ui.data)

(def data { :given-name "Greg "
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
                                                          :date " - 2016/08/19 @ 19:18"}]}})
