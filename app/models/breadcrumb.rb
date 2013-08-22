include ActionView::Helpers::TagHelper
include ActionView::Context
class Breadcrumb
  def initialize url
    @url = url
  end
  
  def build (sep = " [&#8226;] ", include_home = true)
    # adapted from here http://blog.craig-mackenzie.com/2007/08/09/simple-bread-crumbs-in-ruby-on-rails

    levels = get_levels
    levels.delete_at(0)

    links = content_tag(:li, content_tag(:a, "tcias", :href => "/", :accesskey => "h", :title => "Home [h]") << sep.html_safe, :class => "breadcrumb") if include_home

    levels.each_with_index do |level, index|
      item  = level.downcase.gsub(/_/, " ")
      access_key = item[0,1]
      links << content_tag(:li, content_tag(:a,
                                            item,
                                            :href => "/"+levels[0..index].join("/"),
                                            :accesskey => access_key,
                                            :title => "#{item} [#{access_key}]"
      ) << sep.html_safe, :class => "breadcrumb")
    end

    div_content = content_tag(:ul, links)

    content_tag :div, div_content, :id => "breadcrumb"
  end

  def get_levels
    @url.split('?')[0].split('/')
  end

end