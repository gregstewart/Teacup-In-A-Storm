module ApplicationHelper
  # Return a title on a per-page basis.
  def title
    base_title = "TCIAS"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end

  def breadcrumbs(sep = " [&#8226;] ", include_home = true)
    # adapted from here http://blog.craig-mackenzie.com/2007/08/09/simple-bread-crumbs-in-ruby-on-rails
    
    levels = request.path.split('?')[0].split('/')
    levels.delete_at(0)

    links = content_tag(:li, content_tag(:a, "tcias", :href => "/", :accesskey => "h", :title => "Home [h]") << sep.html_safe, :class => "breadcrumb") if include_home

    levels.each_with_index do |level, index|
      item  = level.downcase.gsub(/_/, " ")
      accesskey = item[0,1]
      links << content_tag(:li, content_tag(:a,
                                item,
                                :href => "/"+levels[0..index].join("/"),
                                :accesskey => accesskey,
                                :title => "#{item} [#{accesskey}]"
                           ) << sep.html_safe, :class => "breadcrumb")
    end

    div_content = content_tag(:h3, "Breacrumb") << content_tag(:ul, links)

    content_tag :div, div_content, :id => "breadcrumb" 
  end

  def get_last_url_item
    request.path.split('?')[0].split('/').last
  end

  def haml_image_tag (image,alt)
    {:src => image, :alt => alt, :class => "floatleft", :align => "left", :height => "50", :width => "50"}
  end

  def haml_image_more_tag
    {:src => "images/tcias_more.gif", :alt => "Go to website", :align => "absmiddle", :width=> "16", :height => "16", :border => "0"}
  end
end
