import API from './API'
import Utils from './Utils'

const MockData = function (url, params, isShowLoading) {
  return new Promise((resolve, reject) => {
    let mockData
    switch (url) {
      case API.SYS_captcha:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'captcha_image': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAAiCAIAAAC7jOL6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAxODowODowNiAyMDo0NDozNXEL3MIAABpZSURBVGhDdXlZjFzXeebd97q1V3X1Ur2ySZkiRdKiLDOyLY8Mh7KUxB5g4IfxIHlJggGSwdjzMJYSJU8BEjjvEwMDBIiVOLIdBFAylhJJ3iRRIimJzSbZbPa+1b7dW3ff56u+A8Evc7pxce45/znn///zL99/iwzDMD5tBEGQJElRFPp4ojmOkyQJOgzDYBCU6OMZRZEgCJhCh+M4mqaxEK+YQuN5HuO+72MKC7HE8zzQsCyLWZyCkU+PwAgWYjnG0cE4nliFhim8omE3LMduoEkJUuKUYTTsg346CIJ0BAygg4XpLKbQ0j3BPKawLV4xi7MwBRrqU0nSTnDaUhZFUZQkCbJBDJBiMTrYazwe4yTsAoL0GPTRsByvaOjgAHCfbghiPLEwPeLXhUzPQh/LMZsSpFMYQQd6xJVgB4ykm6OTnghi9NPXtIOG3fDEQtd1sSpdAoKUBqs+1SkaCFJJ085ECzgMLRUYDWrDBJiAFtABu5lMBtSWZWEkpYGOMIJV6e5Yi1dQ4jxsmOoCq0zTHI1G5XI5VUq6MzqKooAS7OIVazGOV9BgNyzEtliIcfTxxCCmsC24//Un2PjUBlNKaAdMooNLwuYgA01KgIPAMw7CLF4xnuodYtq2jdmJsYAz3DM4xhpMY/dCoQBW+v0+XrEGrOTzecyCRTyxo6qqWAmCk5MTnApdgBIHpFrAEjCKTqVSwZLhcCjLcioMtIPjcHytVsO2qcx4TZUIGmyLKXQgkqZpOAvMYEPDMHAcjkjlxBLMYvnFixchBqZAiVPAfLfbRb9YLKZCYh/sjCU4GrPgE68HBwfgEGfhiVc0MAOh6Jdffhm6GAwG6e6YwBpd15vNJjhIVQjmwC762B0iQXg0qA+6wCDOww54pmaJA7AQu4Hv1ArAHwjQ/1R+TKGPy8SGUFa73cY4VuEVTGMWJ3Y6HRwNwcASzgI/4Ap9TGHJ/v4+RFpaWsKhmMI4iMFbq9XCE3rBOHjo9XrYGdzmcrlUCmyChXjiLEgNZsAzeJto6qWXXsIERiED1mMOE6DDMvAEi5iamsIxYB2KxGt6NraGIvEKttIlqQBopVIJdwLxMIgLAdna2hqESa0Mg6C/ffs29pmZmUn5gySrq6sgBve4ZBBDs1ANnmkfjIJ4dna2Wq1CO+AWQkK/uH/M4hXyoIFtLMcp0DIIIBcGcS62ajQaeN3a2trY2Lhw4UI2m4WO8AQxdkjV9//sYqSN4HGYgMuWSsWsqiqy7LseXIrBPQz6DEVn1Zyjj5MogberssTDnUliNBhIolgqlxzbQdhKPb7d6ezs7eqWnlARyRIPtx8Ynp4wISWQgsorObmv9wkmIWkCsQ6GbFsOx3IWRHG8QqkYUcTQ0D0idGPfCmw39gICW0eO5xi2oZuGH4VKRq1UpxA2oFxcO3SKu0SD5NA+9IVLggYRqqBr3A1aemFQHy4VNzE5zQHPIZak/juxC03XBqMRXkAkiEKlVIaXZtXMqNcLQO24xmiEMEAlxO79h3EQFvN5SxuOhwNTG8VRWKmUatPT3W4PCYHheJx53DzZ2d/xYpdgk5jxdk42NadvJUbMh3yWzZZVmiMjMtSMIRHBGD3Xdm3TsWyXZNj68pIdB3udE4fyx6E5cnWXcHVH7w67nUGn0W61ux2CZau1GThIp9OmKRoCp/IghSBsqKehASZGMwzPcbAI9HEIy3IIRouLi/Cjic9GoTbSsASRH2thI2S319989Gh3f//ZZ7+kqhkX0a7Xy2XVcrGwtX4fPoPIOzU988kHN19/7ccHh/s5Wa2VpnY7R7bvlqqVl//sf555/HGCFw8O2gnFcJIyHGt3H9xd31y7ePVstiQYwfD1N3/S7B+HVKDkM/lCaXF2+Xd+4z8KtDgaaKyNqMuSPhv5FMlwyNJElt/uHK7t3rNIs6e1R+P+Z1aWQ8vROoNatmpBqe2RyGcvX/zsM1ev2Zo2XS6fWVxCDGy2mgghMG1RECZRJo7fefvt1157DRYBeymVyt/+9rfr9TkkodRVAz+IkxiuBLc6s7yyvLxMf/ellzVtbFrWmdUzJEFqYw2ZJ6MoAmJJHMuShLVv/fSNn7/x5r0Pb9qjsTPUh612r9/o9zpwW5JNBEmYmZ+naD4iSMv3lWwGd25HZsI6zcHh1tH9od0xw7HujezE1Wx9oPURDA6P91rNY5kWeIrnKYGhePiMh5RBBrvdk3sHm8d6o6W3NWfIcclg2Gk1jnzH1TUdMZrlpXy+WMgXWYAMgozDIJvNweCHo+F0bXp7Z/vHP/rRnbW1Dz/8cH19vdvrjTQNQQHOeP/+/UePHiFewM3hJrCmNFoVi/CEAv3KK39uI/6HwdzsrOPa/cGgWi5LooDEmBFFRVYMw/zrv/iLjz+4QcfJmfpqTs2RDFGu5jiBNT17Y3szWyhe+8IXaUEa23Zv0K9MlXiRjkl7e//ew+21nYMNWRV4kYP7CKJKkaxjuVuPNg72tu2Rvlip55W8ImRpWghiwopChyEOu42N/c2B3U+oIJsRsiJHhxEdRGxM8jSXzRRmZuarlZqayUoAC0hAul4ulf3A91zvzJkz77377l/+1V/e+eQOQub09DRcBvaPaHrnk08+/vjjZrP1/PXrhWIRGQ72wtCMhAsXJYTICUZGkMhkVCgpn8sD1yDlJIGP4FGvVF3DbO3ulDMZpzqFq/j9V16ana8HPiJYd31j/ec33nvv1p2RGxG8gJ0DAvDQOmlsKSq3MJN/46dbvaNdZKehE5w7/8SVZ645AeIH4djarfffZCJ/sVKRGbpUyM3VFg8Pe0kE1ExHYeBZtqebCk+tzC9duXB2Np+dkvN5RmmctCZJP2YJRhEEVeKFyPNFhs1nVMRgMJ/L5pBX0wxIkdTnn376P3/rW4sLC4gOd+/e/Zvv/02z0YRzvPnGm1/96lefvHp1f2+PY1iaoRH4J2by3e/+CeK4YY4n8daHkSaA3FEQmuMxGScAA1qvf+/Ommnaspr78vUXF1bPFqdrY8ve3N394JNPjprd+ZWVy1evcoLo+a7tGLmcSJG+rrV3dx8kgZfP5r/w1LPztZUkEEhfpgKOjqmsQmVkLnDc+2vHRMzOzc9rhq0Devi+XFQRlo8bB0gyK/X6U8h/NDedK9XLNc/yitni/Nwiw8BsicCdKAIYzkNSsAACfECrf3n99Z//7OdANF957ivXrl07e/ZspVxBJgbwOzk+ho0jSYMe9vLkk08ieSFwINciDcF2KEB4KNX3vBOovd1yPQ90lWoF2RFu5rgehASuDqLYcYP9zaP28RClVn/o7h50NrcOBCkTJeRJC2hnYm8cS6sZGchzDNTIiYVccX66fv3L11fnz/abw15jOOqNQy9ZWFosVot9Y/jOL2/c+OjjVr9hI3cGruM7oiQqiixwPBGTLM3hzXUDE77uTa6O59hKsYQaiYxilAlI63EYIX02kS1OGjs7O6+++ur777+HnPjiCy9cuXwZibPVauKS63NzT119amFhHiObDze3t7aRXJBfZUkG3oEu4ETUKbSfFDMInEA7gE8EReaLxbOPPSYrSjafr87OQhF9Td/aP371b//l335ys78TimSVJwoyW/ij//rHLz7/NdiR5zs+hLGd3d39KCDr06u3bu0+eHDseNG9RxumZy6fXYgopzqbf+qLV1pu717r0YF1cu4Ls7OPl0zC8alAVMVipdgb9I4ajVa/b/jewLVPxvooCdueta/1tTjoWuOD1vFgNIAT1Kpl+AiSfTFfmAIGEwSYN/COMQYIigv5fCGXVyQ5m1FhL4cHhwvz9YX6PJzCsa2HGxvvvPW2PhrJolgtV0Lw73kUgzjBTApbip5UkLqm7e3tHR4eavpYLRZRn6CQfPE/ffNLz12XucKo7X707sPX/vZf//mHb2w/OCznastzyysLK/WZusCKREwlERn4KIewpyiIEs2wtuvvHe7vHm33tFamyIl5yoxHe62drtljVI5TqQS+4ltIc7lsZnmuvlibLWZyFLIDQTba3fdv3765vv7+2p0P7q6ZCHdEYrk2QkoIG7IsYDXEvIXFRdgych8yaxInRJzA0nvdLnLn3NwcFkE7wApwFsBlXD0SB+o+REyMI74ghyAHIabANBjYNhRCJoTrOp2Oh0INFX9WVs6snLEsxzSs57/+dYZQtj5qIK4fbDXvr+/pfoOW/JnlEktwCp+pFKphQtAEx7NygNiWcAmZLC0ttvuM7XrHrRN62OEkub6wYoeD/sHBcXvfCSwlI7k9WD6yh8eRoQIElc/nEnKmWM7JGSOyut3+QOvxVCzQVElRhSuTBEyirIE8vmdbgSJlMqjfUDoGgWkYKJlg7RNZCELTdXQAAlvNJkQF+gLoAPSa6AvISlVnZ2YQIlPEGfo+lEW/8qd/alqmbugESWAOPgm7ysgKRzONwyNzpKGKckbaJzc+vn3jbk6cSyIUVI4oUkCMEeF94YvPMBzTaDY9NwLGKZcqxtiRpAw6BJ0EsX/SPmoPGm7sUHy8d7K9sXt3c289IowocKyhFmn+cnXh8uoTgQZpPEsz251uWpLqhpYkAIUA+ok1NnvNdq/R0XtD0o/Lci4D0VhBEWXLtI6PjgAfTo5PNh48uHnrJqy9Pjf/B3/4h+cfv4Br9mwHlgLrgP8CX9xduwvTAGa9dOny4tKyms0COkNxcCkG2GtiNGEwcZLTyrrZasmCWFRBlADMYPD46LjRbgSUf+nK+VymNjLGdzc/POgOEPtRqvKKIOaUiQrkjJiXGEpoNXrN1vHS/HKhoJTLhb/7x38YjtoxGYxMg+KoXFFeOfcZQxs2do9VoZCTlQjRGPVJGHqW6cekKojnl1fz1ZwdOxEd0gwh0ah5k4OdbVTT962HhBMvTNenyzPwX5bjM2pWxt2GEcrCUqEE7TiObRrm7vY2YCUcASgb4AoxEdJF8elXMpZDXOijgNZ15A4QoKqafN6CtJMky7LQC0JGv9/z5UwWFiwroeO0Ot3t7Z2hMSrNFD77uceXFz7jeL75Tw2H7Y9jcu9gD6BxdmkxoQSUP4EfkQSF2qzTO/it3/7yytKV2anKP//k33Svy5G8xCYZVa5PT11YWuy1G1HPynNVgeWAJmWmBAxJUqTI8gWW4VRpXl7wKeQcj2aJWr6cF9Q333od4H7v8IhOaF6QqtVppNVSJov6lRUERDzUskgNyIZACc2Tk2Ef7ngArIEyBI6AEg40kJwH6hMEvMJ9kC5ZJCcOQzzDMixybzaXRZxrddoIuBcev1ACLsvl+432T995+4d//4PA8a5dvfad//7fimqGVu2iKLzwzWdf5J/1yOB/ff/7b73/K0TZP/rjbwOAOF4HZVZBFSWh2m7uslSlmJV/97+8KGWU5ZXVg1bXsHTPGw229sajAedTjeaJj+weZxbncyJDcByzuLA8HI+t5pHA8JVCScpInWHLMMbaaFhfXh6NjVav70vsmIoGoZOXc2PbRBkOdICqE54CQwDKmpuZQxiElaSIE4YAo8AT0TRtsAA8oZGESHAHoATapBAgLNME3kBDFkfdBjvxfB95xDDNXn/QaHSSmAJSmJ2b5YCVEsMOhvmKXJ2BujK6qbU6rfbkKkySSiQJu/uoIFSVj0IEfBtQ4Zmnnjp/5jGJU8+vXJ4pLns6aXSdYUO3Nfc3rn7p0qWrSr5QnZkTVVVzrGa/azg27sl3fVPHrnZeKSIAOcgZDB1yjEMRjfGw55oeQzqhDzeBnEBQSJwwcNSjCH+GaUBUBEuYCbxj8p3m9Iseilr8IyQAsKNhIeDEpE6b4PGI8l0XG6GM7fa66VeN4WjUbLcRNVx/UjzKglqrzKD8BQHyVRD5holymDAMbXdvy7INQWBLxRxJhgxLqFmBZiKKDlEH8wLt+6gkB5ViBQXJcKTJYpYhxfHINTV/NLBtI/jck89cufJ0eXqmVJniZdn0nIPGUbvXAQJ2UImNx1glCKjD84woDR1LwzCZdAwdnZCmXMhAJLBwCDW5Z1GoTk0B8HW6HZSfkBa1BsdPPvbiyhGSAavgD/lCHkgKs4gdQFbQBMZxHP1nf/4KvBy6marV4EZIP1uPtn3XKxdLZ8+da7XaNz+4idBydHRy797Da1e+VFBKSUjWVxc3tzZ/+OoPNrcfzMxVn/vKFy9efEyUKNsdofZLSDdKnJl6eX1j7dXXXqVFXskWq1P17nCsWya0eefeR6ZjooAfe6EZxIKS10zH9SNRlGmK2dnd+/Cj27NLC7X5ufxUpe2MIoqRhNxHj9Z3Tg51y8gVCrVqrVaoFOVc7Ie2YS6vrACtMix7/WtfQyD41S9/9XDzYS6X/83r1wHBcYvv/OydH7z6gw9ufsgJ/P/4znc+//lrNMPAZGAv4SR3RNAjA0VAZzAwTddEUVqYX4iCCMohSArgYm5u/jevP//hjfeH7e6oY731f34BKEGQ0Z17dx7urrePT8jIf+zs0vXn/wNBkrY9pBiSRHhKApZjMrKKwDTQtY2dRxvbx7oWs7LsR5FpjEiGn62vLizUJSVv21HY6E2VRXhz5CeymGGi2BgMkf32jvdjkelCv5PfJYTNgx3YLE2x51c/s1ybVwQpn80lqFRJEwU58BXyBDZBKEDZDUt/+523IyJG5dlptxFTNh9tonKtAXJMT0Isqg2EkklMOP0IBMuCLibuApvsdXsgmqvXFTkzgmkORtpIn5md/fo3vrG7tzMeWp4Rvf3mL4tqWZb5lrbrkQYrAGtPXb50/nOf/+z62l3bsROSRm1DMgnLs56De85Up2db3c79e3t3Ptk5+8RjgoTKjZyrFev1+aWFZUFUBj1t2NXrOTpyPXM4LswqZSFTlpTt+w/GkWdQgZa4MU/RAgswSkdJUVIfXzw7l69kCA4OQJEcHZHDwQAZAf8oPS3LnJ0DDooePNz44NZNlLOCCBAsFAoTXI6sMKliYQ+oZSb1RzzJowBneASoeTxXN8YHh0cZNTc9MzMYjESez6nZ0A2R5bDp4fbha3//47/73z9cVS8WpCJFE5v924KSnH1s/pu/940nnr40vbJgGdZgOOoPhxGRoGDVLa3ZPkA9ycn02sZdlH1D3eAVefLBWC1KpMCh8OaVyxev8DTvG56QsOO+Ph5oq0tnKJ7rGaOfffSBxcZEXrq1c4+U+Xy52D46qZennj5/6cL0UpYWaEDdhESggDioMspluHVxf28fUcAPgrf//a1333v35q1biJKIF7jm733ve8ViAbDqyqXLcAokTXNsII+mH8Emv0UY+hC6GJsmQkO+UKxNz0Ipuaw6M1VrH3c816dRs9HC2kfrN35xc7G8wkWCZ3um3BNlolLKnH1iSS4otCSUSjXEq929fYpmSYoIEq/R2uUkKlsQ26PW2DZszyEQ1liBpyUukgifgvXMTc8JNIdoW87k7dF42OqW80WaZXTP+tXd2/J0aebxlRuP1o3Io3kucryZQvlsra46hEyySLoxRVnIg6dftFFVwv877Q7EQ4B8+HADMAfxEiACXlCuVF742gtTtSlwANWg+oC7oRxNTQNWAs8hu80TwzKgC9txCyUot7q1vQO4XqtWdx7uGZpBhkSlWGYBQWO6OlWcfJAd2MVzWYaLfMfoaC3Lswmari+c6/ZHO1t7HMuLsEuJcrxRTNgkG4pZLowDJ3AZXvT82LVCnswyMU/GNKAtESUizZ1bXk0cT2934QWe5w5N7cHRbvXM/LnPXd7Vui14rGWUsvkcL2USJmwOhYTOiAoKLM00hrqGogvZBJaO2I9LRsyAyaefLVDIo7yAkwAA4nVhYSH9fQB5BF6DWIl++psDaY81+PkYGOP0kzyiOQIJTQOjclSEaIYCEoZIoLZHwcYL5OT3TdfOlOUIQhDE/PIZQZRdL9rb7YYefJcnkxi5z7GH5RJP0p4fjp3AROlIIhcoOc+LLTuS5VJCsMiHNMJKgGQfTMG+lUxOELkgtnS91+/2xqO2MRjHwdPPPWdT4UHnBHxLNJcXFDWkA2As3RBkDHAkQyHq4Q9FqpJRoBdZlgG6cOXILJ7rpZdvWzaiBgAoHMSFDLaFWIukAxiKiAkfoV/5k5cRUSc/y1gWOkiup3qFKgmwCCtCpIkBXGOkcsdLjICyY963Q7OvD0emObtwJqH44cjRRr7vJVEw+ekA6mBI+DAR+17gOiwJvfIsySc+TYYotiSCgKHSBM3GDDJwEkJTJAVPbnfaJE3CxEVZCmPkBVwCKWYUF0nec+EULLb3IxoMoqSnKIZHQUyAYYB3WD7iBxouGYByMBhgzUQHMVifNAgCGpgDijfElMlXil/7FV5VVSTA2PN8C5jJMJGWoCcU7yCBXwVQRugjepKQjIpDKIdwCC5iZdqNfcO1NSA8xx0Mx63WEIwhhukAEJaJ+xF4AXpwHNx6IrCKyKscrQQuScSswMmTtH0K9WASE8CHKjwKO53W3fv3DloNM/KEbEaE8RRKtUqt3+v2O93EC1VWFEk2dn2AUVypkslAaCgAlwx5UqwN1ITqBg3pE3YE6DABlae/5oMAB6EPP8IrVCNLMgYhJZZjiuy224B3ABcwfSgYZg+dob5CBoFGkaYAWokY9SvyAy7dJ6gY3hIAQoSwPDqjFhI4MIZx1bhHpGcb6NEMfEsWaVnhZQWonABODpC8UKWi0iIo1BcAtQGsjQV04GWEF5Lx4au2Db1JipJT1als/ujo6P7WpjBd4hQJ1k57oQBkQjPG2MBtQd3QCCwCLf1ZDHIiKMIoTivxiOUQqIUUpOPqYQandjNpyKCTddSkLscbLn4SO/XJbweIFDaUCsdI56BstMkhp088JkZJ4D+CA8AU4enYHJzAiCEbdEfhH4RJAqdAaPddRxJZlGi8JEDFAXwMmmV5GDa2CX038D0YRcIggfIyJ7ARkvfEFwNkoUmyEUqy2ut09o+P5OkKKmoau1uuQDECyyPxQYwJQMCekxpj8iv/BDwCyJ3+cI00CbZx52igORXp/9swi+W5XO7/AlNEdRgjS8uVAAAAAElFTkSuQmCC',
            'captcha_key': '1234567890'
          },
          'info': null
        }
        break
      case API.SYS_staffLogin:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'user_name': 'staff10',
            'email': null,
            'phone': null,
            'sex': '',
            'reg_time': '2018-06-27T00:12:00+0800',
            'homepage': '',
            'qq': '',
            'points': 100,
            'user_avatar': '',
            'birthday': null,
            'address': '',
            'is_staff': true
          },
          'info': null
        }
        break
      case API.BP_round:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 2,
              'display_name': 'A'
            },
            {
              'id': 1,
              'display_name': 'Pre-A'
            },
            {
              'id': 3,
              'display_name': 'Pre-IPO'
            }
          ],
          'info': {
            'pagination': {
              'count': 3,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.USER_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': '3',
              'user_name': 'user3',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-11-18T10:50:46+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'id': '2',
              'user_name': 'user2',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-11-18T10:50:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'user_name': 'user1',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-11-18T10:50:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': null
            },
            {
              'id': '1',
              'user_name': 'sun',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-11-17T22:34:53+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': {
                'organization': '',
                'reg_time': '2018-11-17T22:35:15+0800',
                'org_email': '',
                'fav_industries': '',
                'fav_round': '',
                'is_reviewed': true,
                'user_id': 2
              }
            },
            {
              'id': '4',
              'user_name': 'DefineFC',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-11-16T21:49:02+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': '',
              'subscription': [],
              'investor': {
                'organization': '',
                'reg_time': '2018-11-17T12:42:48+0800',
                'org_email': '',
                'fav_industries': '',
                'fav_round': '',
                'is_reviewed': true,
                'user_id': 1
              }
            }
          ],
          'info': {
            'pagination': {
              'count': 5,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.BP_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'id': 2,
              'project_name': '测试2',
              'brief': '',
              'upload_time': '2018-10-06T19:47:53+0800',
              'update_time': '2018-10-06T19:47:53+0800',
              'industries': '1,4',
              'round_id': 1,
              'round': 'pre-A',
              'bp_file': 'https://www.investdata.com.cn/api/bp/2/file/',
              'points': 10,
              'permission': false,
              'permission_contact': false,
              'contact_points': 2,
              'view_count': 9
            },
            {
              'id': 1,
              'project_name': '测试',
              'brief': '',
              'upload_time': '2018-10-06T19:47:53+0800',
              'update_time': '2018-10-06T19:47:53+0800',
              'industries': '9',
              'round_id': 1,
              'round': 'pre-A',
              'bp_file': 'https://www.investdata.com.cn/api/bp/1/file/',
              'points': 10,
              'permission': false,
              'permission_contact': false,
              'contact_points': 2,
              'view_count': 9
            }
          ],
          'info': {
            'pagination': {
              'count': 2,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.BP_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 6,
            'project_name': '1118',
            'brief': '',
            'upload_time': '2018-11-21T21:47:53+0800',
            'update_time': '2018-11-21T21:47:53+0800',
            'industries': '',
            'round_id': null,
            'round': null,
            'points': 500,
            'contact_points': 500,
            'view_count': 0
          },
          'info': null
        }
        break
      case API.BP_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_contact:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'user_id': 1,
              'organization': '美团',
              'contact_info': 'contact_info',
              'reg_time': '2018-11-23T15:18:51+0800',
              'is_reviewed': true,
              'user': {
                'user_name': '陈开心',
                'email': 'chenkaixin.meituan.com',
                'phone': '13327772991',
                'sex': '',
                'reg_time': '2018-06-27T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 100,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            },
            {
              'user_id': 2,
              'organization': '新东方',
              'contact_info': 'contact_info',
              'reg_time': '2018-11-23T15:38:51+0800',
              'is_reviewed': true,
              'user': {
                'user_name': '俞敏洪',
                'email': 'yuminhong@xindongfang.com',
                'phone': '13245678888',
                'sex': '',
                'reg_time': '2018-06-27T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 100,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            }
          ],
          'info': {
            'pagination': {
              'count': 2,
              'num_pages': 1,
              'per_page': 50
            }
          }}
        break
      case API.BP_contactCreate:
        mockData = {
          'code': 200,
          'msg': 'OK'
        }
        break
      case API.BP_projectContactDetailApiView(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'organization': 'b',
            'contact_info': '',
            'user_id': 1,
            'reg_time': '2018-11-16T21:57:05+0800',
            'is_reviewed': true,
            'user': {
              'user_name': 'staff10',
              'email': null,
              'phone': null,
              'sex': '',
              'reg_time': '2018-06-27T00:12:00+0800',
              'homepage': '',
              'qq': '',
              'points': 100,
              'user_avatar': '',
              'birthday': null,
              'address': ''
            }
          },
          'info': null
        }
        break
      case API.BP_Industry_query:
        if (params.page === 1) {
          mockData = {
            'code': 200,
            'msg': 'OK',
            'result': [
              {
                'id': 1,
                'display_name': 'TMT'
              },
              {
                'id': 2,
                'display_name': '其他'
              },
              {
                'id': 3,
                'display_name': '钢铁'
              }
            ],
            'info': {
              'pagination': {
                'count': 3,
                'num_pages': 1,
                'per_page': 50
              }
            }
          }
        }
        break
      case API.BP_Industry_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '阶段1'
          },
          'info': null
        }
        break
      case API.BP_Industry_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_Industry_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '阶段2'
          },
          'info': null
        }
        break
      case API.BP_Industry_detail(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': 'Pre-A'
          },
          'info': null
        }
        break
      case API.BP_Round_query:
        if (params.page === 1) {
          mockData = {
            'code': 200,
            'msg': 'OK',
            'result': [
              {
                'id': 2,
                'display_name': 'A'
              },
              {
                'id': 1,
                'display_name': 'Pre-A'
              },
              {
                'id': 3,
                'display_name': 'Pre-IPO'
              }
            ],
            'info': {
              'pagination': {
                'count': 3,
                'num_pages': 1,
                'per_page': 50
              }
            }
          }
        }
        break
      case API.BP_Round_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业1'
          },
          'info': null
        }
        break
      case API.BP_Round_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      case API.BP_Round_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业2'
          },
          'info': null
        }
        break
      case API.BP_Round_detail(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'display_name': '行业1'
          },
          'info': null
        }
        break
      case API.Investor_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'organization': 'Tju',
              'reg_time': '2018-11-21T22:10:14+0800',
              'org_email': 't@j.cn',
              'fav_industries': '1,2',
              'fav_round': '1,3',
              'is_reviewed': true,
              'user_id': 2,
              'user': {
                'user_name': 'staff10',
                'email': null,
                'phone': null,
                'sex': '',
                'reg_time': '2018-06-27T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 100,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            },
            {
              'organization': 'InvestData',
              'reg_time': '2018-11-21T22:11:14+0800',
              'org_email': '',
              'fav_industries': '',
              'fav_round': '',
              'is_reviewed': false,
              'user_id': 3,
              'user': {
                'user_name': 'staff11',
                'email': null,
                'phone': null,
                'sex': '',
                'reg_time': '2018-06-29T00:12:00+0800',
                'homepage': '',
                'qq': '',
                'points': 0,
                'user_avatar': '',
                'birthday': null,
                'address': ''
              }
            }
          ],
          'info': {
            'pagination': {
              'count': 2,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.Learning_query:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': [
            {
              'permission': true,
              'id': 1,
              'points': 0,
              'view_count': 0,
              'outline_file': 'https://www.investdata.com.cn/media/public/online_learning/outline/20190108170016_c7714f79a9.jpg',
              'video_file': 'https://www.investdata.com.cn/api/learning/1/video/',
              'material_title': '在线学习test',
              'update_time': '2019-01-08T17:00:16+0800'
            }
          ],
          'info': {
            'pagination': {
              'count': 1,
              'num_pages': 1,
              'per_page': 50
            }
          }
        }
        break
      case API.Learning_add:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 2,
            'points': 1,
            'view_count': 0,
            'outline_file': 'http://localhost:8000/media/public/online_learning/outline/20190108204146_537888c67f.jpg',
            'material_title': 'ttt',
            'update_time': '2019-01-08T20:41:46+0800'
          },
          'info': null
        }
        break
      case API.Learning_update(1):
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': {
            'id': 1,
            'points': 0,
            'view_count': 0,
            'outline_file': 'http://localhost:8000/media/public/online_learning/outline/20190108170016_c7714f79a9.jpg',
            'material_title': 'tt',
            'update_time': '2019-01-08T17:00:16+0800'
          },
          'info': null
        }
        break
      case API.Learning_delete:
        mockData = {
          'code': 200,
          'msg': 'OK',
          'result': null,
          'info': null
        }
        break
      default:
        mockData = {
          'code': 400,
          'msg': '未找到模拟接口'
        }
    }
    setTimeout(() => {
      if (isShowLoading) Utils.closeLoading()
      console.log('【模拟-网络请求出参】', mockData)
      resolve(mockData)
    }, 1000)
  }
  )
}
export default MockData
