-- 레시피 테이블에 데이터 입력
INSERT INTO "Recipes" ("Field", "description", "cooking_time")
VALUES ('피자', '치즈와 토마토 소스가 들어간 레시피', '30분');

INSERT INTO "Recipes" ("Field", "description", "cooking_time")
VALUES ('스파게티', '토마토 소스와 파스타로 만드는 레시피', '20분');

-- 재료 테이블에 데이터 입력
INSERT INTO "Ingredients" ("name")
VALUES ('치즈');

INSERT INTO "Ingredients" ("name")
VALUES ('토마토 소스');

INSERT INTO "Ingredients" ("name")
VALUES ('파스타');

-- 레시피 재료 테이블에 데이터 입력
-- 첫 번째 레시피(피자)에 첫 번째 재료(치즈)와 두 번째 재료(토마토 소스)가 사용되었다고 가정
INSERT INTO "Recipe_Ingredients" ("recipe_id", "ingredient_id")
VALUES (1, 1);

INSERT INTO "Recipe_Ingredients" ("recipe_id", "ingredient_id")
VALUES (1, 2);

-- 두 번째 레시피(스파게티)에 두째 재료(토마토 소스)와 세 번째 재료(파스)가 사용되었다고 가정
INSERT INTO "Recipe_Ingredients" ("recipe_id", "ingredient_id")
VALUES (2, 2);

INSERT INTO "Recipe_Ingredients" ("recipe_id", "ingredient_id")
VALUES (2, 3);
