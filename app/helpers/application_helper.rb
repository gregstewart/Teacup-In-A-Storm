module ApplicationHelper
  # Returns the full title on a per-page basis.
  def full_title(page_title)
    base_title = "TCIAS"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end

  def breadcrumbs
    Breadcrumb.new(request.path).build
  end

  def get_last_url_item
    request.path.split('?')[0].split('/').last
  end

  def haml_image_tag (image,alt)
    {:src => image, :alt => alt, :class => "floatleft", :align => "left", :height => "50", :width => "50"}
  end

  def haml_image_more_tag
    {:src => "/assets/tcias_more.gif", :alt => "Go to website", :align => "absmiddle", :width=> "16", :height => "16", :border => "0"}
  end
end
