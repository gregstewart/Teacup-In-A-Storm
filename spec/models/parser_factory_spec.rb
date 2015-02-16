require 'spec_helper'

describe 'WrapperFactory' do
  it 'should return a foursquare parser when passed a string of foursquare' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:foursquare)

    parser.should be_a_kind_of(FoursquareParser)
  end

  it 'should return a instagram parser when passed a string of instagram' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:instagram)

    parser.should be_a_kind_of(InstagramParser)
  end

  it 'should return a delicious parser when passed a string of delicious' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:delicious)

    parser.should be_a_kind_of(DeliciousParser)
  end

  it 'should return a github parser when passed a string of github' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:github)

    parser.should be_a_kind_of(GithubParser)
  end

  it 'should return a twitter parser when passed a string of twitter' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:twitter)

    parser.should be_a_kind_of(TwitterParser)
  end

  it 'should return a vimeo parser when passed a string of vimeo' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:vimeo)

    parser.should be_a_kind_of(VimeoParser)
  end

  it 'should return a wordpress parser when passed a string of wordpress' do
    parser_factory = WrapperFactory.new

    parser = parser_factory.build(:wordpress)

    parser.should be_a_kind_of(WordpressParser)
  end

  it 'throws an exception when an unkown parser is requested' do
    parser_factory = WrapperFactory.new

    expect{parser_factory.build('wibble')}.to raise_error('Unknown parser requested')
  end
end
