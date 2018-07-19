defmodule HeroDigital.DateYourBikeTest do
  use HeroDigital.DataCase

  alias HeroDigital.DateYourBike
  alias HeroDigital.Identity

  describe "date_appointments" do
    alias HeroDigital.DateYourBike.DateAppointment

    @valid_attrs %{
      "date" => ~D[2010-04-17],
      "shift" => "some shift",
      "address" => %{
        "complements" => "some complements",
        "number" => "some number",
        "postal_code" => "some postal_code",
        "street" => "some street",
        "telephone_number" => "some telephone_number",
        "town" => "some town"
      },
      "user_id" => nil
    }
    @invalid_attrs %{"date" => nil, "shift" => nil, "address" => nil, "user_id" => nil}

    setup do
      {:ok, user} = Identity.create_user()
      %{user: user}
    end

    def date_appointment_fixture(attrs \\ %{}) do
      {:ok, user} = Identity.create_user()
      valid_attrs = %{@valid_attrs | "user_id" => user.id}
      {:ok, date_appointment} =
        attrs
        |> Enum.into(valid_attrs)
        |> DateYourBike.create_date_appointment()
      date_appointment
    end

    test "list_date_appointments/0 returns all date_appointments" do
      date_appointment = date_appointment_fixture()
      assert DateYourBike.list_date_appointments() == [date_appointment]
    end

    test "get_date_appointment!/1 returns the date_appointment with given id" do
      date_appointment = date_appointment_fixture()
      assert DateYourBike.get_date_appointment!(date_appointment.id) == date_appointment
    end

    test "create_date_appointment/1 with valid data creates a date_appointment", %{user: user} do
      valid_attrs = %{@valid_attrs | "user_id" => user.id}
      assert {:ok, %DateAppointment{} = date_appointment} = DateYourBike.create_date_appointment(valid_attrs)
      assert date_appointment.date == ~D[2010-04-17]
      assert date_appointment.shift == "some shift"
    end

    test "create_date_appointment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = DateYourBike.create_date_appointment(@invalid_attrs)
    end

    test "delete_date_appointment/1 deletes the date_appointment" do
      date_appointment = date_appointment_fixture()
      assert {:ok, %DateAppointment{}} = DateYourBike.delete_date_appointment(date_appointment)
      assert_raise Ecto.NoResultsError, fn -> DateYourBike.get_date_appointment!(date_appointment.id) end
    end

    test "change_date_appointment/1 returns a date_appointment changeset" do
      date_appointment = date_appointment_fixture()
      assert %Ecto.Changeset{} = DateYourBike.change_date_appointment(date_appointment)
    end
  end
end
