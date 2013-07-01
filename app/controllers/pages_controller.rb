class PagesController < ApplicationController

  caches_page :home

  def home
    @title = "home"

    @page = Page.new
    @page.fetch

    respond_to do |format|
      format.html
    end

  end

  def timeline
    @title = "home"

    @page = Page.new
    @page.fetch
    @page.sort_by_date

    render :json => @page
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
