class PagesController < ApplicationController

  caches_page :home, :timeline

  def home
    @title = "home"

    @page = Page.new
    @page.fetch_page_items

    respond_to do |format|
      format.html
    end

  end

  def timeline
    @title = "timeline"

    @page = Page.new
    @page.fetch_sorted_page_items

    respond_to do |format|
      format.html
      format.json
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
