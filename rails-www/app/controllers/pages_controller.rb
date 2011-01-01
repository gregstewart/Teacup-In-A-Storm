class PagesController < ApplicationController
  def home
    @title = "home"
  end

  def portfolio
    @title = "portfolio"
  end

  def cv
    @title = "cv"
  end

end
