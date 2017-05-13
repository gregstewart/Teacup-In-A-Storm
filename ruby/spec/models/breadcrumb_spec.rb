require 'spec_helper'

describe 'Breadcrumb' do

  it 'should generate a breadcrumb' do
    url = 'http://localhost:3000/test/path?query=param'
    expected = "<div id=\"breadcrumb\"><ul><li class=\"breadcrumb\"><a accesskey=\"h\" href=\"/\" title=\"Home [h]\">tcias</a> [&#8226;] </li><li class=\"breadcrumb\"><a accesskey=\"\" href=\"/\" title=\" []\"></a> [&#8226;] </li><li class=\"breadcrumb\"><a accesskey=\"l\" href=\"//localhost:3000\" title=\"localhost:3000 [l]\">localhost:3000</a> [&#8226;] </li><li class=\"breadcrumb\"><a accesskey=\"t\" href=\"//localhost:3000/test\" title=\"test [t]\">test</a> [&#8226;] </li><li class=\"breadcrumb\"><a accesskey=\"p\" href=\"//localhost:3000/test/path\" title=\"path [p]\">path</a> [&#8226;] </li></ul></div>"
    breadcrumb = Breadcrumb.new(url)

    breadcrumb.build.should == expected
  end

end