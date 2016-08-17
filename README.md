The 'ys-direction' uses google map directions service to display distance/time between two points.

Example using src:
    ### Default component output
    <ys-direction
      travel-mode="WALKING"
      start='{ "lat" : "", "lng" : "" }'
      end='{ "lat" : "", "lng" : "" }'></ys-direction>

    ### Custom component output
    <template is="dom-bind">
      <ys-direction
        hide-output,
        result={{ result }}
        travel-mode="WALKING"
        start='{ "lat" : "", "lng" : "" }'
        end='{ "lat" : "", "lng" : "" }'></ys-direction>
      <p>
        It is {{ result.distance.text }} away,
        Will take you {{ result.duration.text }} walking to get there, good luck
      </p>
    </template>
