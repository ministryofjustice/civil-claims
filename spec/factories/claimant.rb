FactoryGirl.define do
  factory :claimant do |c|
    full_name "joe bloggs"
    phone     "+44 (0)207 12345678"
    email     "email.address@example.com"

    association :address, factory: :address, strategy: :build
  end
end