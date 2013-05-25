class PagesController < ApplicationController

  caches_page :home

  def home
    @title = "home"

    @page_items = Page.new.fetch


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
