class PagesController < ApplicationController
  def home
    @title = "home"
    respond_to do |format|
      format.html
    end
  end

  def portfolio
    @title = "portfolio"
    respond_to do |format|
      format.html
    end
  end

  def cv
    @title = "cv"
    respond_to do |format|
      format.html
    end
  end
end
