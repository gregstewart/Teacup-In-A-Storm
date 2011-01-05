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

    links = content_tag(:li, content_tag(:a, "tcias", :href => "/") << sep.html_safe, :class => "breadcrumb") if include_home

    levels.each_with_index do |level, index|
      links << content_tag(:li, content_tag(:a,
                                level.downcase.gsub(/_/, " "),
                                :href => "/"+levels[0..index].join("/")
                           ) << sep.html_safe, :class => "breadcrumb")
    end

    div_content = content_tag(:h3, "Breacrumb") << content_tag(:ul, links)

    content_tag :div, div_content, :id => "breadcrumb" 
  end
end
