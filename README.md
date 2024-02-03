 나만의	요리 레시피 사이트📖
나만의 특별한 레시피를 저장하고 내가가진 재료로 만들 수 있는 레시피를 확인해볼수 있는 웹앱을 만들어보자!
�요리를 좋아하던 싫어하던 그 누구라도 나만의 레시피 혹은 좋아하는 레시피를 등록해두고 이용할 수 있다.

📆 프로젝트 기간
2024.01.26 ~ 2024.02.05
배포 주소
백엔드 깃허브코드
https://github.com/MWTeamB/Recipe_Backend


🌽 프로젝트 참여 멤버
김동욱`s 깃허브	
https://github.com/dong5397
![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/9141ab41-290e-412f-a0af-8b6ee82c0325)

백민기`s 깃허브
https://github.com/MkBaek0229
![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/b1c155b9-b1ba-4442-a9f3-1ee024f314e8)

React	express
🛠 Tools
Backend
 ![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/cabdedd6-01d5-4e9a-a210-16e1c6d76912)
 ![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/44543fd0-fc57-4896-88cb-214371aba6d0)


Infrastructure
 ![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/bf38bbea-ab37-4525-9a72-dc7eb51dbb9f)
![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/5da4b93e-4091-4bd7-8b39-472601658794)


Dev tools
 ![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/a6b77c04-112d-4611-a89e-c1f7246f9814)

![image](https://github.com/MWTeamB/Recipe_Backend/assets/141000247/d48ecfe0-4b4d-4103-9215-b947169f5c7e)

클라이언트 요청에 따른 Flow chart
flow chart
이슈: '내 저장창고' 테이블이 '레시피' 테이블과 '재료' 테이블의 외래키를 참조하도록 설계되었으나, 이로 인해 '내 저장창고'와 '레시피' 기능에서 오류가 발생했습니다.

문제 상황: '내 저장창고' 테이블은 사용자가 보유한 재료를 관리하는 역할을 합니다. 이 테이블이 '레시피' 테이블과 '재료' 테이블에 의존적이라면, 
레시피나 재료 정보가 변경될 때마다 '내 저장창고' 테이블도 영향을 받게 됩니다. 이로 인해 데이터 무결성을 유지하는 데 어려움이 발생하였습니다.

해결책: '내 저장창고' 테이블을 독립적인 테이블로 변경하여 이 문제를 해결했습니다. 
즉, '내 저장창고' 테이블은 이제 '레시피' 테이블이나 '재료' 테이블의 외래키를 참조하지 않습니다. 
이 변경으로 인해 '내 저장창고' 테이블은 더 이상 '레시피'나 '재료' 테이블의 변경에 영향을 받지 않게 되어, 데이터 무결성을 유지하는 데 도움이 되었습니다.



