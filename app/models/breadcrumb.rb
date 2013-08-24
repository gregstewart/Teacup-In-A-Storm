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
      item  = convert_url_keywords_to_words(level)
      access_key = generate_access_key(item)
      href_path = generate_href_path(index, levels)
      generate_link(access_key, href_path, item, links, sep)
    end

    div_content = content_tag(:ul, links)

    content_tag :div, div_content, :id => "breadcrumb"
  end

    def generate_link(access_key, href_path, item, links, sep)
      title = build_link_title(access_key, item)
      links << content_tag(:li, content_tag(:a,
                                            item,
                                            :href => href_path,
                                            :accesskey => access_key,
                                            :title => title
      ) << sep.html_safe, :class => "breadcrumb")
    end

    def build_link_title(access_key, item)
      "#{item} [#{access_key}]"
    end

    def convert_url_keywords_to_words(level)
      level.downcase.gsub(/_/, " ")
    end

    def generate_access_key(item)
      item[0, 1]
    end

    def generate_href_path(index, levels)
      "/"+levels[0..index].join("/")
    end

    def get_levels
      @url.split('?')[0].split('/')
    end

    def get_last_url_item
      @url.split('?')[0].split('/').last
    end
  private :generate_link, :build_link_title, :convert_url_keywords_to_words, :generate_access_key, :generate_href_path,
          :get_levels, :get_last_url_item
end