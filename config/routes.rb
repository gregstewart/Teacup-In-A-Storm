Teacupinastorm::Application.routes.draw do
  match "portfolio", :to => "pages#portfolio"
  match "cv", :to => "pages#cv"
  match "timeline", :to => "pages#timeline"
  get "pages/home"
  root :to => "pages#home"

  mount JasmineRails::Engine => "/specs" if defined?(JasmineRails)
end
