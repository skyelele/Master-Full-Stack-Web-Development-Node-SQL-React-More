CREATE TABLE trait(
  id SERIAL     PRIMARY KEY,
  --  VARCHAR represents a string of any length
  --  NOT NULL so that you can't enter a blank value.
  "traitType"   VARCHAR NOT NULL,
  "traitValue"  VARCHAR NOT NULL
);