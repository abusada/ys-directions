The `ys-direction` provides declarative method to make AB Tests.

#### Default usage (Machine selects variation)

A cookie with default name `YsExpirement` will be saved,
and later read to ensure same users see the same variation for 7 days.
if you are conducting multiple directions in one page, make sure to externally provide cookieName
so they will not conflict

```
<ys-direction>
  <ys-variant label="original">
    First variation
  </ys-variant>
  <ys-variant label="new">
    Second variation
  </ys-variant>
</ys-direction>
```

#### Example using Google [Content Expirment API](https://developers.google.com/analytics/solutions/directions-client-side)

> When using google cxApi, no need to provide cookieName, the guys at google are handling that.

```
<ys-direction use-google expirment-id="li3h2j3dh83">
  <ys-variant label="original">
    First variation
  </ys-variant>
  <ys-variant label="new">
    Second variation
  </ys-variant>
</ys-direction>
```

#### Example of externally choosen variation (server side)

0 = first

1 = second

...etc

```
<ys-direction variation="1">
  <ys-variant label="original">
    First variation
  </ys-variant>
  <ys-variant label="new">
    Second variation
  </ys-variant>
</ys-direction>
```
