Teacupinastorm::Application.routes.draw do
  match "portfolio", :to => "pages#portfolio"
  match "cv", :to => "pages#cv"
  get "pages/home"
  root :to => "pages#home"

end
