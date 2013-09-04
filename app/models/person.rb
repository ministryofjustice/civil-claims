class Person < ActiveRecord::Base
  belongs_to :claim
  has_one :address, as: :addressable

  scope :randomly, -> { order("RANDOM()") }

  def display_name
    "#{self.title} #{self.full_name}".strip
  end

  def extended_contact_details
    %w(phone mobile email).reject{|x| self.send(x).blank? }.map {|x| self.send(x) }
  end

  def self.at_random
    randomly.first
  end

  def claims
    Claim.where(:owner => self)
  end
  
  def self.create_random
    self.create(generate)
  end

  def self.generate
    {
      :full_name  => "#{Random.firstname} #{Random.lastname}",
      :phone      => Random.phone,
      :email      => Random.email,
    }
  end
end
